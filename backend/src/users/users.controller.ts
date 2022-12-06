import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/users.create.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { UserResponseDto } from './dto/users.responese.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getMyProfile(@Param('id') id: string) {
    return await this.usersService.findById({ id });
  }

  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<UserResponseDto> {
    const result = await this.usersService.create({ user });
    return new UserResponseDto(result);
  }

  // @Patch()
  // async updateUser(@Body user:)
}
