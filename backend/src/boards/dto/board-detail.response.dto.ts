import { PickType } from '@nestjs/swagger';
import { Board } from '../entity/board.entity';

export class BoardDetailResponseDto extends PickType(Board, [
  'id',
  'title',
  'content',
  'isNotice',
  'user',
  'createdAt',
  'updatedAt',
] as const) {}
