import { Board } from './../boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  cellPhone: string;

  @Column()
  createdAt: string;

  @Column()
  status: string;

  // eager: true 면 보드 정보 가져올 때 유저 정보도 같이 가져옴
  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
