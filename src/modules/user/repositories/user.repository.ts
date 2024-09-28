import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: UserEntity): Promise<User> {
    const newUser = new this.userModel({
      email: user.email,
      password: user.password,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
    });

    return newUser.save();
  }
}
