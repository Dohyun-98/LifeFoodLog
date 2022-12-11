import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/commons/strategies/jwt.strategy';
import { Food } from 'src/foods/entity/food.entity';
import { FoodsService } from 'src/foods/foods.service';
import { TodayKcal } from 'src/today-kcal/entity/today-kcal.entity';
import { TodayKcalService } from 'src/today-kcal/today-kcal.service';
import { FoodLog } from './entity/food-log.entity';
import { FoodLogController } from './food-log.controller';
import { FoodLogService } from './food-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodLog, TodayKcal, Food])],
  controllers: [FoodLogController],
  providers: [FoodLogService, JwtStrategy, TodayKcalService, FoodsService],
})
export class FoodLogModule {}
