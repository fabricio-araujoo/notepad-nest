import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import {
  IGetCurrentUseCaseInput,
  IGetCurrentUseCaseOutput,
} from './interfaces/get-current.interface';

@Injectable()
export class GetCurrentUseCase {
  constructor(private userService: UserService) {}

  async execute(
    input: IGetCurrentUseCaseInput
  ): Promise<IGetCurrentUseCaseOutput> {
    try {
      const doc = await this.userService.find(input.user.email);

      const user = new UserEntity(doc._id, doc.email, doc.password, doc.name);

      await this.userService.update(user);

      const profile: IGetCurrentUseCaseOutput['profile'] = {
        id: String(user._id),
        email: user.email,
        name: user.name,
        lastLogin: doc.lastLogin,
      };

      return {
        profile,
      };
    } catch (error) {
      throw error;
    }
  }
}
