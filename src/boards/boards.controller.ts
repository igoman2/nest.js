import { Body, Controller, Get, Post } from '@nestjs/common';

import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.BoardsService.getAllBoards();
  }

  // @Body('title') title
  // @Body('description') description
  @Post()
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
    // controller에서 service의 메서드를 매핑
    return this.BoardsService.createBoard(CreateBoardDto);
  }
}
