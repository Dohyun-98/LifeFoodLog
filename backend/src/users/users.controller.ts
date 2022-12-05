import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
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
  async createUser(@Body() user: UserRequestDto): Promise<UserResponseDto> {
    const result = await this.usersService.create({ user });
    return new UserResponseDto(result);
  }
}
