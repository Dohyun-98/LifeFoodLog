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

  async findByDay(userId: string, period: number) {
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
      .orderBy('todayKcal.createdAt', 'ASC')
      .getMany();
    return todayKcal;
  }

  async findByWeek(userId: string, period: number) {
    // timezone 기준으로 period 주전까지 1주씩 데이터 평균(breakfastKcal, lunchKcal, dinnerKcal, totalKcal)을 가져온다.
    const result = Array.from({ length: period }, (_, i) => period - i);
    console.log(result);
    const todayKcal = Promise.all(
      result.map(async (i) => {
        console.log(new Date(new Date().setDate(new Date().getDate() - i * 7)));
        console.log(
          new Date(new Date().setDate(new Date().getDate() - (i - 1) * 7)),
        );
        const weekKcal = await this.todayKcalRepository
          .createQueryBuilder('todayKcal')
          .select(
            'AVG(todayKcal.breakfastKcal) as breakfastKcal, AVG(todayKcal.lunchKcal) as lunchKcal, AVG(todayKcal.dinnerKcal) as dinnerKcal, AVG(todayKcal.totalKcal) as totalKcal',
          )
          .where(
            'todayKcal.user = :userId AND todayKcal.createdAt BETWEEN :startDate AND :endDate',
            {
              userId,
              startDate: new Date(
                new Date().setDate(new Date().getDate() - i * 7),
              ),
              endDate: new Date(
                new Date().setDate(new Date().getDate() - (i - 1) * 7),
              ),
            },
          )
          .getRawOne();
        return weekKcal;
      }),
    );
    return todayKcal;
  }

  async findByMonth(userId: string, period: number) {
    // timezone 기준으로 period 달전까지 1달씩 데이터 평균(breakfastKcal, lunchKcal, dinnerKcal, totalKcal)을 가져온다.
    const result = Array.from({ length: period }, (_, i) => period - i);
    console.log(result);
    const todayKcal = Promise.all(
      result.map(async (i) => {
        console.log(new Date(new Date().setMonth(new Date().getMonth() - i)));
        console.log(
          new Date(new Date().setMonth(new Date().getMonth() - (i - 1))),
        );
        const monthKcal = await this.todayKcalRepository
          .createQueryBuilder('todayKcal')
          .select(
            'AVG(todayKcal.breakfastKcal) as breakfastKcal, AVG(todayKcal.lunchKcal) as lunchKcal, AVG(todayKcal.dinnerKcal) as dinnerKcal, AVG(todayKcal.totalKcal) as totalKcal',
          )
          .where(
            'todayKcal.user = :userId AND todayKcal.createdAt BETWEEN :startDate AND :endDate',
            {
              userId,
              startDate: new Date(
                new Date().setMonth(new Date().getMonth() - i),
              ),
              endDate: new Date(
                new Date().setMonth(new Date().getMonth() - (i - 1)),
              ),
            },
          )
          .getRawOne();
        console.log(monthKcal);
        return monthKcal;
      }),
    );
    return todayKcal;
  }
}
