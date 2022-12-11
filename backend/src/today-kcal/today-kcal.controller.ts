import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtUser } from 'src/commons/types/jwtUser';
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

  // 기간 파라미터에 따른 breakfast 데이터, lunch 데이터, dinner 데이터를 가져온다.
  @UseGuards(JwtAuthGuard)
  @Get(':period')
  async getTodayKcalByPeriod(
    @Req() req: JwtUser,
    @Param('period') period: number,
  ) {
    const result = await this.todayKcalService.findByPeriod(
      req.user.id,
      period,
    );
    console.log('perioddjkashdkjashdkashdka' + JSON.stringify(result));
  }
}
