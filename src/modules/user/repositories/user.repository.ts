import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: UserEntity): Promise<User> {
    const doc = new this.userModel({
      email: user.email,
      password: user.password,
      name: user.name,
    });

    return doc.save();
  }

  async update(user: UserEntity): Promise<User> {
    const doc = await this.userModel.findOneAndUpdate({ _id: user._id }, user, {
      new: true,
    });

    return doc;
  }
}
