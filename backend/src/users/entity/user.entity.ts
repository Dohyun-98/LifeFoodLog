import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
