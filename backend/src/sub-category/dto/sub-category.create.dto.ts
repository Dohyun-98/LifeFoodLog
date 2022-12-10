import { PickType } from '@nestjs/swagger';
import { SubCategory } from '../entity/sub-category.entity';

export class SubCategoryCreateDto extends PickType(SubCategory, [
  'name',
  'maincategory',
]) {}
