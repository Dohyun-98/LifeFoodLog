import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessToken } from 'src/commons/types/accessToken';
import { UserEmailDto } from 'src/users/dto/users.email.dto';
import { UserRequestDto } from 'src/users/dto/users.request.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
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

  @Post('mail')
  async sendMail(@Body() user: UserEmailDto): Promise<boolean> {
    return await this.authService.sendMail(user);
  }

  @Post('authentication')
  async authentication(
    @Body() body: { email: string; number: string },
  ): Promise<boolean> {
    return await this.authService.authenticationMail(body.email, body.number);
  }
}
