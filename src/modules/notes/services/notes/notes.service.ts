import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';
import { Types } from 'mongoose';
import { NoteEntity } from '../../entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private noteRepository: NoteRepository) {}

  async findUserNotes(id: Types.ObjectId): Promise<NoteEntity[]> {
    return this.noteRepository.findAll(id);
  }

  async create(note: NoteEntity): Promise<NoteEntity> {
    return this.noteRepository.create(note);
  }
}
