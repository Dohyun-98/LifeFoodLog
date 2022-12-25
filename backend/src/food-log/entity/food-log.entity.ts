import { MealTime } from 'src/commons/types/mealTime';
import { Food } from 'src/foods/entity/food.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FoodLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MealTime })
  mealtime: MealTime;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Food)
  food: Food;

  @CreateDateColumn()
  createdAt: Date;
}
