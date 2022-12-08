import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtUser } from 'src/commons/types/jwtUser';
import { UserCreateDto } from './dto/users.create.dto';
import { UserResponseDto } from './dto/users.responese.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyProfile(@Req() req: JwtUser): Promise<UserResponseDto> {
    const result = await this.usersService.findById({ id: req.user.id });
    return new UserResponseDto(result);
  }

  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<UserResponseDto> {
    const result = await this.usersService.create({ user });
    return new UserResponseDto(result);
  }

  // @Patch()
  // async UpdateMyProfile(@Req() req: JwtUser): Promise<UserResponseDto> {
  //   const result = await this.usersService.update({ user: req.user });
  //   return new UserResponseDto(result);
  // }
}
