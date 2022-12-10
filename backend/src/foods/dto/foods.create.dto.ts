import { PickType } from '@nestjs/swagger';
import { Food } from '../entity/food.entity';

export class FoodsCreateDto extends PickType(Food, [
  'name',
  'kcal',
  'subcategory',
] as const) {}
