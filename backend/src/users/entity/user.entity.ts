import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { FoodLog } from 'src/food-log/entity/food-log.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: '1',
    description: 'The id of the User',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the User',
    type: String,
  })
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'test',
    description: 'The nickname of the User',
    type: String,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    example: '12Sqecd34!',
    description: 'The password of the User',
    type: String,
  })
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
