import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtUser } from 'src/commons/types/jwtUser';
import { UserUpdateRequestDto } from './dto/user.update.request.dto';
import { UserUpdatePasswordRequestDto } from './dto/user.updatePassword.request.dto';
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  async UpdateMyProfile(
    @Req() req: JwtUser,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    const result = await this.usersService.updateNickName({
      user: req.user,
      nickname: body.nickname,
    });
    return new UserResponseDto(result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/password')
  async UpdateMyPassword(
    @Req() req: JwtUser,
    @Body() body: UserUpdatePasswordRequestDto,
  ): Promise<UserResponseDto> {
    const result = await this.usersService.updatePassword({
      user: req.user,
      password: body.password,
    });
    return new UserResponseDto(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMyProfile(@Req() req: JwtUser): Promise<boolean> {
    return await this.usersService.deleteUser({ user: req.user });
  }
}
