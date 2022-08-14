import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

//Inject를 통해 이 JwtStrategy를 Nest 어디서든 사용할 수 있도록
@Injectable()

// passpoart-jwt 에서 제공하는 strategy를 사용
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // payload의 username 정보를 가지고 DB에서 조회해야 하기 때문에 UserRepository를 inject
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'Secret1234', // AuthModule에서 설정한 secretKey랑 똑같은 값
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Token 타입은 bearer
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
