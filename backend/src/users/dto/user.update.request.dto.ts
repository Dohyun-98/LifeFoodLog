import { PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserUpdateRequestDto extends PickType(User, [
  'nickname',
] as const) {}
