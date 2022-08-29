import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserDto } from './dto/user.dto';
import { GetUser } from './get-user.decorator';
import { getUserInfoById } from './types';
import { User } from './user.entity';

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

  @Post('/:test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    console.log('user', user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getUserInfoById(@Param('id') id: number): Promise<getUserInfoById> {
    return this.authService.getUserInfoById(id);
  }
}
