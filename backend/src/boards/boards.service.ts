import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCreateRequestDto } from './dto/board.create.request.dto';
import { BoardUpdateRequestDto } from './dto/board.update.request.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardsService {
  @InjectRepository(Board)
  private readonly boardsRepository: Repository<Board>;

  async findMaxPage(limit: number) {
    const total = await this.boardsRepository.count();
    return Math.ceil(total / limit);
  }

  async findListByPage(page: number, limit: number) {
    // const [boards, total] = await this.boardsRepository.findAndCount({
    //   take: limit,
    //   skip: (page - 1) * limit,
    //   order: { createdAt: 'DESC' },
    // });

    const [boards, total] = await this.boardsRepository

      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .select([
        'board.id',
        'board.title',
        'board.content',
        'board.isNotice',
        'board.createdAt',
        'board.updatedAt',
        'user.nickname',
      ])
      .orderBy('board.createdAt', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
    return { boards, total };
  }

  async findBoardById(id: string) {
    return await this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .select([
        'board.id',
        'board.title',
        'board.content',
        'board.isNotice',
        'board.createdAt',
        'board.updatedAt',
        'user.nickname',
      ])
      .where('board.id = :id', { id })
      .getOne();
  }

  async create(board: BoardCreateRequestDto, userId: string) {
    return await this.boardsRepository.save({
      ...board,
      user: { id: userId },
    });
  }

  async update(id: string, board: BoardUpdateRequestDto, userId: string) {
    const target = await this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id })
      .getOne();

    if (target.user.id !== userId) {
      throw new UnprocessableEntityException('no permission');
    }
    const result = await this.boardsRepository.save({
      id,
      ...target,
      ...board,
    });
    return {
      id: result.id,
      content: result.content,
      title: result.title,
      isNotice: result.isNotice,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    };
  }

  async delete(id: string, userId: string) {
    const target = await this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id })
      .getOne();

    if (target.user.id !== userId) {
      throw new UnprocessableEntityException('no permission');
    }
    const result = await this.boardsRepository.delete({
      id,
    });
    return result.affected ? true : false;
  }

  async findIsMyBoardById(id: string, userId: string) {
    const target = await this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id })
      .getOne();
    return target.user.id === userId;
  }
}
