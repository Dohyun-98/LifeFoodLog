import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findById({ id }): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create({ user }): Promise<User> {
    const isAuth = await this.cacheManager.get(user.email);
    if (!isAuth) {
      throw new UnprocessableEntityException('not auth');
    }
    const findUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (findUser) {
      throw new UnprocessableEntityException('already exist email');
    }
    const findUserByNickname = await this.usersRepository.findOne({
      where: { nickname: user.nickname },
    });
    if (findUserByNickname) {
      throw new UnprocessableEntityException('already exist nickname');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
}
