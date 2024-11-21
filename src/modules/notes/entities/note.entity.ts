import { Types } from 'mongoose';

export class NoteEntity {
  constructor(
    public _id: Types.ObjectId | null,
    public title: string,
    public content: string,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public user: Types.ObjectId // user reference
  ) {}
}
