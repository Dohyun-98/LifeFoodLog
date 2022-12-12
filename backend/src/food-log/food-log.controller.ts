import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/commons/strategies/jwt.strategy';
import { JwtUser } from 'src/commons/types/jwtUser';
import { MealTime } from 'src/commons/types/mealTime';
import { FoodLogCreateDto } from './dto/food-log.create.dto';
import { FoodLogService } from './food-log.service';

@Controller('food-log')
export class FoodLogController {
  constructor(private readonly foodLogService: FoodLogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('breakfast')
  async createFoodLogOfBreakfast(
    @Req() req: JwtUser,
    @Body() body: FoodLogCreateDto,
  ) {
    return this.foodLogService.create(body, req.user.id, MealTime.BREAKFAST);
  }

  @UseGuards(JwtAuthGuard)
  @Post('lunch')
  async createFoodLogOfLunch(
    @Req() req: JwtUser,
    @Body() body: FoodLogCreateDto,
  ) {
    return this.foodLogService.create(body, req.user.id, MealTime.LUNCH);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dinner')
  async createFoodLogOfDinner(
    @Req() req: JwtUser,
    @Body() body: FoodLogCreateDto,
  ) {
    return this.foodLogService.create(body, req.user.id, MealTime.DINNER);
  }

  @UseGuards(JwtAuthGuard)
  @Get('breakfast')
  async getFoodLogOfBreakfast(@Req() req: JwtUser) {
    return this.foodLogService.getFoodLog(req.user.id, MealTime.BREAKFAST);
  }

  @UseGuards(JwtAuthGuard)
  @Get('lunch')
  async getFoodLogOfLunch(@Req() req: JwtUser) {
    return this.foodLogService.getFoodLog(req.user.id, MealTime.LUNCH);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dinner')
  async getFoodLogOfDinner(@Req() req: JwtUser) {
    return this.foodLogService.getFoodLog(req.user.id, MealTime.DINNER);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':period')
  async getFoodClassificationByPeriod(
    @Req() req: JwtUser,
    @Param('period') period: number,
  ) {
    console.log('period', period, req.user);
    return await this.foodLogService.getFoodClassifyLog(req.user.id, period);
  }
}
