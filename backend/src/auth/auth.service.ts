import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { PayLoad } from 'src/commons/types/payload';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/commons/types/accessToken';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('not exist account');
    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('invalid Password');
    }
    return user;
  }

  async getAccessToken(user: User): Promise<AccessToken> {
    const payload: PayLoad = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async sendMail(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new UnprocessableEntityException('already exist email');
    const number = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    await this.mailerService
      .sendMail({
        to: email,
        from: process.env.MAIL_SENDER,
        subject: process.env.MAIL_SUBJECT,
        html: `인증번호는 ${number}입니다.`,
      })
      .then(async () => {
        const isFirstMail = await this.cacheManager.get(email);
        if (isFirstMail) {
          await this.cacheManager.del(email);
        }
        await this.cacheManager.set(email, number, { ttl: 300 });
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return true;
  }

  async authenticationMail(email: string, number: string): Promise<boolean> {
    const cacheNumber = await this.cacheManager.get(email);
    if (cacheNumber !== number) {
      throw new UnprocessableEntityException('invalid number');
    }
    await this.cacheManager.del(email);
    await this.cacheManager.set(email, 'success', { ttl: 600 });
    return true;
  }
}
