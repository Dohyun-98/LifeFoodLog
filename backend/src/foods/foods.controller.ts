import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async createFood(@Body() food: FoodsCreateDto): Promise<FoodsResponseDto> {
    return await this.foodsService.create(food);
  }
}
