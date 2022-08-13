import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'wnsgh1007!',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티를 이용해서 데이터 베이스 테이블을 생성
  synchronize: true, // 애플리케이션을 다시 실핼할 때 엔티티 안에서 수정된 컬럼의 변경등에 대해 해당 테이블을 Drop 후 다시 생성
};
