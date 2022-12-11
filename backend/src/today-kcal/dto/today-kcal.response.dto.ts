import { PickType } from '@nestjs/swagger';
import { TodayKcal } from '../entity/today-kcal.entity';

export class TodayKcalResponseDto extends PickType(TodayKcal, [
  'breakfastKcal',
  'lunchKcal',
  'dinnerKcal',
  'totalKcal',
]) {
  constructor(todayKcal: TodayKcal) {
    super();
    this.breakfastKcal = todayKcal.breakfastKcal;
    this.lunchKcal = todayKcal.lunchKcal;
    this.dinnerKcal = todayKcal.dinnerKcal;
    this.totalKcal = todayKcal.totalKcal;
  }
}
