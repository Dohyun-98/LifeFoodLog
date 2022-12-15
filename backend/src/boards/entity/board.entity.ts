import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
export class Board {
  @ApiProperty({
    example: '1',
    description: '게시글 번호',
    type: String,
  })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '제목',
    description: '게시글 제목',
    type: String,
  })
  @Column({ length: 50 })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '내용',
    description: '게시글 내용',
    type: String,
  })
  @Column({ length: 500 })
  content: string;

  @ApiProperty({
    example: 'false',
    description: '공지사항 여부',
    type: Boolean,
  })
  @Column({ type: 'boolean', default: false })
  isNotice: boolean;

  @ApiProperty({
    example: '1',
    description: '작성자 번호',
    type: String,
  })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '게시글 생성일',
    type: String,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '게시글 수정일',
    type: String,
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
