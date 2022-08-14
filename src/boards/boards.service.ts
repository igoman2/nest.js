import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
// uuid 라이브러리에 여러 라이브러리 중 v1을 사용하겠다. DB를 사용하면 자동으로 생성돼서 안써도 됨.
import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

// service의 역할은 DB 데이터 생성, 유효성 체크 등 상세 로직 처리
@Injectable()
export class BoardsService {
  constructor(
    // BoardService 안에서 BoardRepository를 사용할 수 있도록 DI
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    // board 테이블에 대한 query builder 생성
    const query = this.boardRepository.createQueryBuilder('board');

    // board table의 userId 컬럼을 비교
    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();
    return boards;
  }

  createBoard(CreateBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(CreateBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
