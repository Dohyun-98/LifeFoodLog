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
import { FoodsCreateDto } from './dto/foods.create.dto';
import { FoodsResponseDto } from './dto/foods.response.dto';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  async getFoods(): Promise<FoodsResponseDto[]> {
    return await this.foodsService.findAll();
  }

  @Get(':id')
  async getFood(@Param('id') id): Promise<FoodsResponseDto[]> {
    return await this.foodsService.find({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createFood(@Body() food: FoodsCreateDto): Promise<FoodsResponseDto> {
    return await this.foodsService.create(food);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteFood(@Param('id') id: string): Promise<boolean> {
    return await this.foodsService.delete(id);
  }
}
