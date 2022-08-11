import { Board, BoardStatus } from './board.model';

import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
// uuid 라이브러리에 여러 라이브러리 중 v1을 사용하겠다.
import { v1 as uuid } from 'uuid';

// service의 역할은 DB 데이터 생성, 유효성 체크 등 상세 로직 처리
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(CreateBoardDto: CreateBoardDto) {
    // 디스트럭쳐링을 통해 코드 단순화
    const { title, description } = CreateBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
