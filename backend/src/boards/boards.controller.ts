import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { JwtUser } from 'src/commons/types/jwtUser';
import { BoardsService } from './boards.service';
import { BoardDetailResponseDto } from './dto/board-detail.response.dto';
import { BoardListResponseDto } from './dto/board-list.response.dto';
import { BoardPageRequestDto } from './dto/board-page.request.dto';
import { BoardCreateRequestDto } from './dto/board.create.request.dto';
import { BoardUpdateRequestDto } from './dto/board.update.request.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/maxpage')
  async getMaxPage(@Query() { limit }: BoardPageRequestDto): Promise<number> {
    return await this.boardsService.findMaxPage(limit);
  }

  @Get()
  async getBoardListPagenation(
    @Query() { page, limit }: BoardPageRequestDto,
  ): Promise<BoardListResponseDto[]> {
    const result = await this.boardsService.findListByPage(page, limit);
    return result.boards.map((board) => new BoardListResponseDto(board));
  }

  @Get(':id')
  async getBoardDetailById(
    @Param('id') id: string,
  ): Promise<BoardDetailResponseDto> {
    return await this.boardsService.findBoardById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(
    @Body() board: BoardCreateRequestDto,
    @Req() req: JwtUser,
  ): Promise<BoardDetailResponseDto> {
    return await this.boardsService.create(board, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() board: BoardUpdateRequestDto,
    @Req() req: JwtUser,
  ) {
    return await this.boardsService.update(id, board, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBoard(
    @Param('id') id: string,
    @Req() req: JwtUser,
  ): Promise<boolean> {
    return await this.boardsService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mine/:id')
  async getIsMyBoardById(
    @Param('id') id: string,
    @Req() req: JwtUser,
  ): Promise<boolean> {
    return await this.boardsService.findIsMyBoardById(id, req.user.id);
  }
}
