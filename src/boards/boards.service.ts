import { Board, BoardStatus } from './board.model';

import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(CreateBoardDto: CreateBoardDto) {
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
}
