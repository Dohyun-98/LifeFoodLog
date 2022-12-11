import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { TodayKcal } from './entity/today-kcal.entity';
import { TodayKcalController } from './today-kcal.controller';
import { TodayKcalService } from './today-kcal.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodayKcal])],
  controllers: [TodayKcalController],
  providers: [TodayKcalService, JwtAuthGuard],
  exports: [TodayKcalService],
})
export class TodayKcalModule {}
