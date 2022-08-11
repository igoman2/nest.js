import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

// 컨트롤러는 리퀘스트를 서비스에 매핑해주는 역할
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

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.BoardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    this.BoardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.BoardsService.updateBoardStatus(id, status);
  }
}
