import { PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserUpdatePasswordRequestDto extends PickType(User, [
  'password',
] as const) {}
