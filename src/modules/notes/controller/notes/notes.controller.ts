import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/core/interfaces/auth-request.interface';
import { ListNotesUseCase } from '../../use-cases/notes/list-notes.use-case';
import { CreateNotesDto } from '../../dtos/notes/create.dto';
import { CreateNotesUseCase } from '../../use-cases/notes/create-notes.use-case';

@Controller('notes')
export class NotesController {
  constructor(
    private listNotesUseCase: ListNotesUseCase,
    private createNotesUseCase: CreateNotesUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Req() request: AuthenticatedRequest) {
    return this.listNotesUseCase.execute({ user: request?.user });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateNotesDto
  ) {
    return this.createNotesUseCase.execute({ user: request?.user, ...body });
  }
}
