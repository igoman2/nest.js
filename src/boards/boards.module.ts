import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
