import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

export class UserResponseDto {
  @ApiProperty({
    example: '1',
    description: 'The id of the User',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'test',
    description: 'The nickname of the User',
    type: String,
  })
  nickname: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the User',
    type: String,
  })
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
  }
}
