import { Body, Controller, Post } from '@nestjs/common';
import { AccessToken } from 'src/commons/types/accessToken';
import { UserRequestDto } from 'src/users/dto/users.request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user_: UserRequestDto): Promise<AccessToken> {
    const user = await this.authService.validateUser(
      user_.email,
      user_.password,
    );
    return await this.authService.getAccessToken(user);
  }
}
