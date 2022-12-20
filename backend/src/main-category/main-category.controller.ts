import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { Role } from 'src/commons/types/role';
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
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createMainCategory(
    @Body() body: MainCategoryCreateDto,
  ): Promise<MainCategoryRequestDto> {
    return await this.mainCategoryService.create(body.name);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteMainCategory(@Param('id') id: string): Promise<boolean> {
    return await this.mainCategoryService.delete(id);
  }
}
