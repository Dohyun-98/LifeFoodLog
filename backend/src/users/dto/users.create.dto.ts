import { PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserCreateDto extends PickType(User, [
  'email',
  'nickname',
  'password',
] as const) {}
