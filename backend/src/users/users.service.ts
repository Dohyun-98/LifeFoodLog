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

  async updateNickName({ user, nickname }) {
    const findUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (!findUser) {
      throw new UnprocessableEntityException('not exist user');
    }
    const findUserByNickname = await this.usersRepository.findOne({
      where: { nickname },
    });
    if (findUserByNickname) {
      throw new UnprocessableEntityException('already exist nickname');
    }
    return await this.usersRepository.save({
      ...findUser,
      nickname,
    });
  }

  async updatePassword({ user, password }) {
    // redis에서 검증 확인 후 비밀번호 변경
    const isAuth = await this.cacheManager.get(user.email);
    if (!isAuth) {
      throw new UnprocessableEntityException('not auth');
    }
    const findUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (!findUser) {
      throw new UnprocessableEntityException('not exist user');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersRepository.save({
      id: findUser.id,
      ...findUser,
      password: hashedPassword,
    });
  }

  async deleteUser({ user }) {
    const findUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (!findUser) {
      throw new UnprocessableEntityException('not exist user');
    }
    const result = await this.usersRepository.delete({ id: user.id });
    return result.affected ? true : false;
  }
}
