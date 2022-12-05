import { User } from 'src/users/entity/user.entity';

export class UserResponseDto {
  id: string;

  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}
