import { ObjectId } from 'mongoose';

export type ISignUpUseCaseInput = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
};

export type ISignUpUseCaseOutput = {
  _id: ObjectId;
  email: string;
  name: string;
  dateOfBirth: Date;
};
