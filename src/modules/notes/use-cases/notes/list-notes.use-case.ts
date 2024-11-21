import { Injectable } from '@nestjs/common';
import {
  IListNotesUseCaseInput,
  IListNotesUseCaseOutput,
} from './interfaces/list-notes.interface';
import { NotesService } from '../../services/notes/notes.service';
import { convertToObjectId } from 'src/utils/convert-to-objectid';
import { NoteEntity } from '../../entities/note.entity';

@Injectable()
export class ListNotesUseCase {
  constructor(private notesService: NotesService) {}

  async execute(
    input: IListNotesUseCaseInput
  ): Promise<IListNotesUseCaseOutput> {
    const userId = convertToObjectId(input.user._id);

    const notes = await this.notesService.findUserNotes(userId);

    if (!notes) {
      return { notes: [] };
    }

    const arr: Pick<NoteEntity, '_id' | 'title' | 'content'>[] = notes.map(
      (note) => ({
        _id: note._id,
        title: note.title,
        content: note.content,
      })
    );

    return { notes: arr };
  }
}
