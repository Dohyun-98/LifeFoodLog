import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TodayKcal {
  @ApiProperty({
    example: '21232222',
    description: 'The id of the today kcal',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '{id: 21232222,}',
    description: 'The id of the user',
    type: String,
  })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty({
    example: '19000',
    description: 'user of the today total kcal',
    type: Number,
  })
  @Column({ default: 0 })
  totalKcal: number;

  @ApiProperty({
    example: '3000',
    description: 'user of the today breakfast kcal',
    type: Number,
  })
  @Column({ default: 0 })
  breakfastKcal: number;

  @ApiProperty({
    example: '3000',
    description: 'user of the today lunch kcal',
    type: Number,
  })
  @Column({ default: 0 })
  lunchKcal: number;

  @ApiProperty({
    example: '3000',
    description: 'user of the today dinner kcal',
    type: Number,
  })
  @Column({ default: 0 })
  dinnerKcal: number;

  @CreateDateColumn()
  createdAt: Date;
}
