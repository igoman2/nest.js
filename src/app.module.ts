import { BoardsModule } from './boards/boards.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
