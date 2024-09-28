import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import {
  ISignUpUseCaseInput,
  ISignUpUseCaseOutput,
} from './interfaces/sign-up.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SignUpUseCase {
  constructor(private userService: UserService) {}

  async execute(input: ISignUpUseCaseInput): Promise<ISignUpUseCaseOutput> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new UserEntity(
      null,
      input.email,
      hashedPassword,
      input.name,
      input.dateOfBirth
    );

    const newUser = await this.userService.create(user);

    return {
      _id: newUser._id,
      email: user.email,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
    };
  }
}
