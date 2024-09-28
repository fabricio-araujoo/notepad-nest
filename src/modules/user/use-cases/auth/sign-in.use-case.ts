import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import {
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from './interfaces/sign-in.interface';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class SignInUseCase {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async execute(input: ISignInUseCaseInput): Promise<ISignInUseCaseOutput> {
    const user = await this.userService.find(input.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const compare = await bcrypt.compare(input.password, user.password);

    if (!compare) {
      throw new Error('Email ou senha inválido');
    }

    const payload: Partial<UserEntity> = {
      _id: user._id,
      email: user.email,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
