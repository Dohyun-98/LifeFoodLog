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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSubCategory(@Param('id') id: string): Promise<boolean> {
    return await this.subCategoryService.delete(id);
  }
}
