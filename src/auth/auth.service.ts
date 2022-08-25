import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(userDto: UserDto): Promise<{ accessToken: string }> {
    const { username, password } = userDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bycrypt.compare(password, user.password))) {
      // 유저 토큰 발급 (Secret + Payload)
      // payload에는 중요한 정보를 넣지 말 것
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async getUserInfoById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    return found;
  }
}
