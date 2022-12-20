import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(comment, userId) {
    return await this.commentRepository.save({
      text: comment.text,
      board: { id: comment.board },
      user: { id: userId },
    });
  }

  async findCommentsByBoardIdWithisMine(id, userId) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.board', 'board')
      .where('board.id = :id', { id })
      .select([
        'comment.id',
        'comment.text',
        'comment.updatedAt',
        'user.nickname',
        'user.id',
        'board.id',
      ])
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
    return comments.map((comment) => ({
      ...comment,
      isMine: comment.user.id === userId,
    }));
  }

  async update(body, userId) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id: body.id })
      .select(['comment.id', 'user.id'])
      .getOne();
    if (!comment || comment.user.id !== userId) {
      throw new UnprocessableEntityException('not valid comment');
    }
    return await this.commentRepository.save({
      id: body.id,
      ...comment,
      text: body.text,
    });
  }

  async delete(id, userId) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id })
      .select(['comment.id', 'user.id'])
      .getOne();
    if (!comment || comment.user.id !== userId) {
      throw new UnprocessableEntityException('not valid comment');
    }
    const result = await this.commentRepository.delete({ id });
    return result.affected ? true : false;
  }
}
