import { OmitType, PartialType } from '@nestjs/swagger';
import { Board } from '../entity/board.entity';

export class BoardUpdateRequestDto extends PartialType(
  OmitType(Board, ['id']),
) {}
