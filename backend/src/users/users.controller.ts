import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getMyProfile(@Param('id') id: string) {
    return await this.usersService.findById({ id });
  }

  @Post('/')
  async createUser(){
    return await this.usersService.();
  }
}
