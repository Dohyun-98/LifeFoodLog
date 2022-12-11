import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealTime } from 'src/commons/types/mealTime';
import { FoodsService } from 'src/foods/foods.service';
import { TodayKcalService } from 'src/today-kcal/today-kcal.service';
import { Between, Repository } from 'typeorm';
import { FoodLogCreateDto } from './dto/food-log.create.dto';
import { FoodLog } from './entity/food-log.entity';

@Injectable()
export class FoodLogService {
  constructor(
    @InjectRepository(FoodLog)
    private readonly foodLogRepository: Repository<FoodLog>,
    private readonly todayKcalService: TodayKcalService,
    private readonly foodService: FoodsService,
  ) {}
  async create(data: FoodLogCreateDto, userId: string, mealtime: MealTime) {
    // data.food 배열안의  id로 kcal을 가져와서 변수 kcal에 저장

    const foodKcalList = await Promise.all(
      data.foods.map(async (food) => {
        const foodData = await this.foodService.findOneById(food);
        return foodData.kcal;
      }),
    );
    const kcal = foodKcalList.reduce((acc, cur) => acc + cur, 0);

    const foodLog = await this.foodLogRepository.find({
      where: {
        user: { id: userId },
        mealtime,
      },
    });
    if (foodLog) {
      await this.foodLogRepository.delete({
        user: { id: userId },
        mealtime,
        createdAt: Between(
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ),
      });
    }

    const FoodLogList = await Promise.all(
      data.foods.map(async (food) => {
        new Promise(async (resolve, reject) => {
          const foodLog = this.foodLogRepository.create({
            food: { id: food },
            user: { id: userId },
            mealtime,
          });
          await this.foodLogRepository.save(foodLog);
          resolve(foodLog);
        });
      }),
    );
    await this.todayKcalService.setTodayKcal(kcal, userId, mealtime);
  }

  async getFoodLog(userId: string, mealtime: MealTime) {
    //쿼리빌더를 사용하여 foodLog와 kcal을 가져온다.
    const foodLog = await this.foodLogRepository
      .createQueryBuilder('foodLog')
      .leftJoinAndSelect('foodLog.food', 'food')
      .where('foodLog.user.id = :userId', { userId })
      .andWhere('foodLog.mealtime = :mealtime', { mealtime })
      .andWhere('foodLog.createdAt BETWEEN :start AND :end', {
        start: new Date(new Date().setHours(0, 0, 0, 0)),
        end: new Date(new Date().setHours(23, 59, 59, 999)),
      })
      .getMany();

    console.log(foodLog);
    return foodLog;
  }
}
