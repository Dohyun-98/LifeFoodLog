import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtUser } from 'src/commons/types/jwtUser';
import { TodayKcalPeriodDto } from './dto/today-kcal.period.dto';
import { TodayKcalResponseDto } from './dto/today-kcal.response.dto';
import { TodayKcalService } from './today-kcal.service';

@Controller('today-kcal')
export class TodayKcalController {
  constructor(private readonly todayKcalService: TodayKcalService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodayKcal(@Req() req: JwtUser): Promise<TodayKcalResponseDto> {
    const result = await this.todayKcalService.findByDate(req.user.id);
    return new TodayKcalResponseDto(result);
  }

  // 기간 파라미터에 따른 breakfast 데이터, lunch 데이/터, dinner 데이터를 가져온다.
  @UseGuards(JwtAuthGuard)
  @Get('day/:period')
  async getTodayKcalOfDay(
    @Req() req: JwtUser,
    @Param('period') period: number,
  ): Promise<TodayKcalPeriodDto[]> {
    return await this.todayKcalService.findByDay(req.user.id, period);
  }
  @UseGuards(JwtAuthGuard)
  @Get('week/:period')
  async getTodayKcalOfWeek(
    @Req() req: JwtUser,
    @Param('period') period: number,
  ) {
    return await this.todayKcalService.findByWeek(req.user.id, period);
  }

  @UseGuards(JwtAuthGuard)
  @Get('month/:period')
  async getTodayKcalOfMonth(
    @Req() req: JwtUser,
    @Param('period') period: number,
  ) {
    return await this.todayKcalService.findByMonth(req.user.id, period);
  }
}
