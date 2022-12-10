import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entity/main-category.entity';
import { MainCategoryController } from './main-category.controller';
import { MainCategoryService } from './main-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  controllers: [MainCategoryController],
  providers: [MainCategoryService],
})
export class MainCategoryModule {}
