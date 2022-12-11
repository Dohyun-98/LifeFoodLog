import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealTime } from 'src/commons/types/mealTime';
import { Between, Repository } from 'typeorm';
import { TodayKcal } from './entity/today-kcal.entity';

@Injectable()
export class TodayKcalService {
  constructor(
    @InjectRepository(TodayKcal)
    private readonly todayKcalRepository: Repository<TodayKcal>,
  ) {}

  async setTodayKcal(kcal: number, userId: string, mealtime: MealTime) {
    const todayKcal = await this.todayKcalRepository.findOne({
      where: {
        user: { id: userId },
        createdAt: Between(
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ),
      },
    });
    if (todayKcal) {
      todayKcal.totalKcal -= todayKcal[`${mealtime}Kcal`];
      todayKcal[`${mealtime}Kcal`] = kcal;
      todayKcal.totalKcal += kcal;
      await this.todayKcalRepository.save(todayKcal);
    } else {
      const newTodayKcal = this.todayKcalRepository.create({
        user: { id: userId },
        totalKcal: kcal,
        [`${mealtime}Kcal`]: kcal,
      });
      await this.todayKcalRepository.save(newTodayKcal);
    }
    return todayKcal;
  }

  async findByDate(userId: string) {
    const todayKcal = await this.todayKcalRepository.findOne({
      where: {
        user: { id: userId },
        createdAt: Between(
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ),
      },
    });
    if (!todayKcal) {
      const newTodayKcal = this.todayKcalRepository.create({
        totalKcal: 0,
        breakfastKcal: 0,
        lunchKcal: 0,
        dinnerKcal: 0,
      });
      return newTodayKcal;
    }
    return todayKcal;
  }

  async findByPeriod(userId: string, period: number) {
    // 쿼리 빌더를 이용해 오늘부터 period일 전까지의 데이터를 가져온다.
    const todayKcal = await this.todayKcalRepository

      .createQueryBuilder('todayKcal')
      .where(
        'todayKcal.user = :userId AND todayKcal.createdAt BETWEEN :startDate AND :endDate',
        {
          userId,
          startDate: new Date(
            new Date().setDate(new Date().getDate() - period),
          ),
          endDate: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      )
      .getMany();
    return todayKcal;
  }
}
