import { Body, Controller, Get, Post } from '@nestjs/common';
import { MainCategoryCreateDto } from './dto/main-category.create.dto';
import { MainCategoryRequestDto } from './dto/main-category.request.dto';
import { MainCategoryService } from './main-category.service';

@Controller('main-category')
export class MainCategoryController {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Get()
  async getMainCategory(): Promise<MainCategoryRequestDto[]> {
    return await this.mainCategoryService.findAll();
  }

  @Post()
  async createMainCategory(
    @Body() body: MainCategoryCreateDto,
  ): Promise<MainCategoryRequestDto> {
    return await this.mainCategoryService.create(body.name);
  }
}
