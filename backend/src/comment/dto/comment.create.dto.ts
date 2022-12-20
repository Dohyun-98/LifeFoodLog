import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Comment } from '../entity/comment.entity';

export class commentCreateDto extends PickType(Comment, ['text']) {
  @ApiProperty({
    example: '1',
    description: 'The id of the board',
    type: 'string',
  })
  @IsString()
  board: string;
}
