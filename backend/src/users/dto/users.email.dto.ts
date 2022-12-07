import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @ApiProperty({
    example: 'test@email.com',
    description: 'The email of the User',
    type: String,
  })
  email: string;
}
