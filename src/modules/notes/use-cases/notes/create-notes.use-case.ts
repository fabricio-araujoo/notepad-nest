import { Injectable } from '@nestjs/common';
import {
  ICreateNotesUseCaseInput,
  ICreateNotesUseCaseOutput,
} from './interfaces/create-notes.interface';
import { NoteEntity } from '../../entities/note.entity';
import { NotesService } from '../../services/notes/notes.service';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class CreateNotesUseCase {
  constructor(private notesService: NotesService) {}

  async execute(
    input: ICreateNotesUseCaseInput
  ): Promise<ICreateNotesUseCaseOutput> {
    const userId = convertToObjectId(input.user._id);

    const note = new NoteEntity(
      null,
      input.title,
      input.content,
      null,
      null,
      userId
    );

    const newNote = await this.notesService.create(note);

    return {
      _id: newNote._id,
      content: newNote.content,
      createdAt: newNote.createdAt,
      title: newNote.title,
      updatedAt: newNote.updatedAt,
    };
  }
}
