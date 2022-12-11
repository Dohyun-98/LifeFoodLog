import { Test, TestingModule } from '@nestjs/testing';
import { TodayKcalService } from './today-kcal.service';

describe('TodayKcalService', () => {
  let service: TodayKcalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodayKcalService],
    }).compile();

    service = module.get<TodayKcalService>(TodayKcalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
