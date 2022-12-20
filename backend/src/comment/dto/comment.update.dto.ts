import { PickType } from '@nestjs/swagger';
import { Comment } from '../entity/comment.entity';

export class CommentUpdateDto extends PickType(Comment, ['id', 'text']) {}
