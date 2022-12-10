import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MainCategory {
  @ApiProperty({
    example: '21121212',
    description: 'The id of the MainCategory',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({
    example: '식사',
    description: 'The name of the MainCategory',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
}
