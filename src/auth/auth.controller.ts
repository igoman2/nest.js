import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserDto } from './dto/user.dto';
import { UserInfo } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    // ValidationPipe를 넣어줘야 dto에 유효성 검증 로직이 돌아감
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userDto);
  }

  @Get('/users')
  getUsers(): Promise<UserInfo[]> {
    return this.authService.getUsers();
  }

  @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  getUserInfoById(@Param('id') id: number): Promise<UserInfo> {
    return this.authService.getUserInfoById(id);
  }

  @Put('/:id')
  // @UseGuards(AuthGuard('jwt'))
  updateUserInfoById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userInfo: UserInfo,
  ) {
    return this.authService.updateUserInfoById(id, userInfo);
  }

  @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'))
  deleteUserInfoById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUserInfoById(id);
  }
}
