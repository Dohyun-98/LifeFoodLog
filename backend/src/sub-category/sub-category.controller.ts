import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubCategoryCreateDto } from './dto/sub-category.create.dto';
import { SubCategoryResponseDto } from './dto/sub-category.response.dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  async getSubCategories(): Promise<SubCategoryResponseDto[]> {
    return await this.subCategoryService.findAll();
  }

  @Get(':id')
  async getSubCategory(@Param('id') id): Promise<SubCategoryResponseDto[]> {
    return await this.subCategoryService.find({ id });
  }

  @Post()
  async createSubCategory(
    @Body() body: SubCategoryCreateDto,
  ): Promise<SubCategoryResponseDto> {
    return await this.subCategoryService.create(body);
  }
}
