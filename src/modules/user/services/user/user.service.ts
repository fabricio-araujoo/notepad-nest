import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async find(email: string): Promise<UserEntity> {
    return this.userRepository.find(email);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.create(user);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.update(user);
  }
}
