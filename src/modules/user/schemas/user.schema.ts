import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ECollections } from 'src/core/enums/collections';
import { UserEntity } from '../entities/user.entity';

export type UserDocument = User & Document;

@Schema({
  collection: ECollections.USUARIOS,
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;

      return ret;
    },
  },
})
export class User extends UserEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
