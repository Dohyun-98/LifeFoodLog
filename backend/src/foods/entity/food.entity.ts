import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubCategory } from 'src/sub-category/entity/sub-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @ApiProperty({
    example: '21121212',
    description: 'The id of the Food',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '스파게티',
    description: 'The name of the Food',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    example: '100',
    description: 'The kcal of the Food',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column()
  kcal: number;

  @ManyToOne(() => SubCategory)
  subcategory: SubCategory;
}
