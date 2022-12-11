import { Test, TestingModule } from '@nestjs/testing';
import { TodayKcalController } from './today-kcal.controller';

describe('TodayKcalController', () => {
  let controller: TodayKcalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodayKcalController],
    }).compile();

    controller = module.get<TodayKcalController>(TodayKcalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
