import { PickType } from '@nestjs/swagger';
import { Board } from '../entity/board.entity';

export class BoardCreateRequestDto extends PickType(Board, [
  'title',
  'content',
] as const) {}
