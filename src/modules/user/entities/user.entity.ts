import { ObjectId } from 'mongoose';

export class UserEntity {
  constructor(
    public _id: ObjectId | null,
    public email: string,
    public password: string,
    public name: string,
    public dateOfBirth: Date
  ) {}
}
