import { Types } from 'mongoose';

export class UserEntity {
  constructor(
    public _id: Types.ObjectId | null,
    public email: string,
    public password: string,
    public name: string,
    public dateOfBirth: Date
  ) {}
}
