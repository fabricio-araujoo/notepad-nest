import { Types } from 'mongoose';

export type ISignUpUseCaseInput = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
};

export type ISignUpUseCaseOutput = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  dateOfBirth: Date;
};
