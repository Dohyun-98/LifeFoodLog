import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { PayLoad } from 'src/commons/types/payload';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/commons/types/accessToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (email !== user.email) {
      throw new UnauthorizedException('invalid ID');
    }
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
}
