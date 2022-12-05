import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findById({ id }): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create({ user }): Promise<User> {
    const findUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (findUser) {
      throw new UnprocessableEntityException('already exist email');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
}
