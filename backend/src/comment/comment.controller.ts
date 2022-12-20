import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { commentCreateDto } from './dto/comment.create.dto';
import { CommentUpdateDto } from './dto/comment.update.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 생성
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() comment: commentCreateDto, @Req() req) {
    return await this.commentService.create(comment, req.user.id);
  }

  // 조회 By boardId (내 댓글 여부 포함)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getComments(@Req() req, @Param('id') id: string) {
    return await this.commentService.findCommentsByBoardIdWithisMine(
      id,
      req.user.id,
    );
  }

  // 수정 By commentId
  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateComment(@Req() req, @Body() body: CommentUpdateDto) {
    return await this.commentService.update(body, req.user.id);
  }

  // 삭제 By commentId
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteComment(@Req() req, @Param('id') id: string): Promise<boolean> {
    return await this.commentService.delete(id, req.user.id);
  }
}
