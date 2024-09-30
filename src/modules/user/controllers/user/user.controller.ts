import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserEntity } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('get-current')
  async getCurrent(@Req() request: Request & { user: UserEntity }) {
    console.log({ request: request.user });

    return { teste: 'teste' };
  }
}
