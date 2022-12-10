import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MainCategory } from 'src/main-category/entity/main-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubCategory {
  @ApiProperty({
    example: '21121212',
    description: 'The id of the SubCategory',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '한식',
    description: 'The name of the SubCategory',
    type: String,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => MainCategory)
  @IsNotEmpty()
  maincategory: MainCategory;
}
