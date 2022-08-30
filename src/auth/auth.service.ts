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
import { UserInfo } from './types';

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

  async getUserInfoById(id: number): Promise<UserInfo> {
    const found = await this.userRepository.findOne({ id });
    const resp: UserInfo = {
      username: found.username,
      name: found.name,
      cellPhone: found.cellPhone,
    };

    if (!found) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    return resp;
  }

  async updateUserInfoById(id: number, userInfo: UserInfo): Promise<UserInfo> {
    const user = await this.userRepository.findOne({ id });
    const modifiedUser = {
      ...user,
      username: userInfo.username,
      name: userInfo.name,
      cellPhone: userInfo.cellPhone,
    };

    await this.userRepository.save(modifiedUser);

    return user;
  }

  async deleteUserInfoById(id: number): Promise<void> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }
  }

  async getUsers(): Promise<UserInfo[]> {
    const query = this.userRepository.createQueryBuilder('user');
    const users = await query.getMany();

    return users;
  }
}
