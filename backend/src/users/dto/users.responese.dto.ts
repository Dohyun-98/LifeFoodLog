import { User } from 'src/users/entity/user.entity';

export class UserResponseDto {
  id: string;
  nickname: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
  }
}
