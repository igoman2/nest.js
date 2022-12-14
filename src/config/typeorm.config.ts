import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

let typeConfig;

if (process.env.NODE_ENV === 'development')
  typeConfig = {
    type: dbConfig.type,
    // url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티를 이용해서 데이터 베이스 테이블을 생성
    synchronize: true, // 애플리케이션을 다시 실핼할 때 엔티티 안에서 수정된 컬럼의 변경등에 대해 해당 테이블을 Drop 후 다시 생성
  };
else {
  typeConfig = {
    type: dbConfig.type,
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티를 이용해서 데이터 베이스 테이블을 생성
    synchronize: true, // 애플리케이션을 다시 실핼할 때 엔티티 안에서 수정된 컬럼의 변경등에 대해 해당 테이블을 Drop 후 다시 생성
  };
}
export const typeORMConfig: TypeOrmModuleOptions = typeConfig;
