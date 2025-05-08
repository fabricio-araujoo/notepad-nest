import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import {
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from './interfaces/sign-in.interface';

@Injectable()
export class SignInUseCase {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async execute(input: ISignInUseCaseInput): Promise<ISignInUseCaseOutput> {
    const doc = await this.userService.find(input.email);

    if (!doc) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const compare = await bcrypt.compare(input.password, doc.password);

    if (!compare) {
      throw new HttpException(
        'Email ou senha inválido',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = new UserEntity(doc._id, doc.email, doc.password, doc.name);

    const payload: Partial<UserEntity> = {
      _id: user._id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
