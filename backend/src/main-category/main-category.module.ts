import { Module } from '@nestjs/common';
import { MainCategoryController } from './main-category.controller';
import { MainCategoryService } from './main-category.service';

@Module({
  controllers: [MainCategoryController],
  providers: [MainCategoryService]
})
export class MainCategoryModule {}
