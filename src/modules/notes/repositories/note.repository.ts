import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';
import { Model, Types } from 'mongoose';
import { NoteEntity } from '../entities/note.entity';

@Injectable()
export class NoteRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll(id: Types.ObjectId): Promise<Note[]> {
    return this.noteModel.find({ user: id });
  }

  async create(note: NoteEntity): Promise<Note> {
    const newNote = new this.noteModel({
      title: note.title,
      content: note.content,
      user: note.user,
    });

    return newNote.save();
  }
}
