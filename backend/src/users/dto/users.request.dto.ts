import { PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
