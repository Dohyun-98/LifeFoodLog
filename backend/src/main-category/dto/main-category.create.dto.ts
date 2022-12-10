import { PickType } from '@nestjs/swagger';
import { MainCategory } from '../entity/main-category.entity';

export class MainCategoryCreateDto extends PickType(MainCategory, [
  'name',
] as const) {}
