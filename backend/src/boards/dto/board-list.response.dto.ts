import { PickType } from '@nestjs/swagger';
import { Board } from '../entity/board.entity';

export class BoardListResponseDto extends PickType(Board, [
  'id',
  'title',
  'isNotice',
  'user',
  'createdAt',
  'updatedAt',
] as const) {
  constructor(board: Board) {
    super();
    this.id = board.id;
    this.title = board.title;
    this.user = board.user;
    this.isNotice = board.isNotice;
    this.createdAt = board.createdAt;
    this.updatedAt = board.updatedAt;
  }
}
