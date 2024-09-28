import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { SignUpUseCase } from '../../use-cases/auth/sign-up.use-case';
import { SignInUseCase } from '../../use-cases/auth/sign-in.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase
  ) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.signInUseCase.execute(dto);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }
}
