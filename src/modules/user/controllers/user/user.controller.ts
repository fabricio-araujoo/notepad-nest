import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/core/interfaces/auth-request.interface';
import { GetCurrentUseCase } from '../../use-cases/user/get-current.use-case';

@Controller('user')
export class UserController {
  constructor(private getCurrentUseCase: GetCurrentUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-current')
  async getCurrent(@Req() request: AuthenticatedRequest) {
    return this.getCurrentUseCase.execute({ ...request });
  }
}
