import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Board } from 'src/boards/entity/board.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'The id of the comment',
    type: 'string',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'This is a comment',
    description: 'The text of the comment',
    type: 'string',
  })
  @Column({ type: 'varchar' })
  @MaxLength(67)
  @IsString()
  text: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
