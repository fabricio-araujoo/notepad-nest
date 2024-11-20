import { Injectable } from '@nestjs/common';
import {
  IGetCurrentUseCaseInput,
  IGetCurrentUseCaseOutput,
} from './interfaces/get-current.interface';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { DateService } from 'src/core/adapter/date/date.service';
import { EDateFormat } from 'src/core/enums/date';

@Injectable()
export class GetCurrentUseCase {
  constructor(
    private userService: UserService,
    private dateService: DateService
  ) {}

  async execute(
    input: IGetCurrentUseCaseInput
  ): Promise<IGetCurrentUseCaseOutput> {
    const _user = await this.userService.find(input.user.email);

    const user = new UserEntity(
      _user._id,
      _user.email,
      _user.password,
      _user.name,
      _user.dateOfBirth
    );

    const profile: IGetCurrentUseCaseOutput['profile'] = {
      id: String(user._id),
      dateOfBirth: this.dateService.formatISODate(
        user.dateOfBirth.toISOString(),
        EDateFormat.DATE
      ),
      email: user.email,
      name: user.name,
    };

    return {
      profile,
    };
  }
}
