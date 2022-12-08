import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { UserCreateDto } from './dto/users.create.dto';
import { UserResponseDto } from './dto/users.responese.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyProfile(@Param('id') id: string) {
    const result = await this.usersService.findById({ id });
    return new UserResponseDto(result);
  }

  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<UserResponseDto> {
    const result = await this.usersService.create({ user });
    return new UserResponseDto(result);
  }

  // @Patch()
  // async updateUser(@Body user:)
}
