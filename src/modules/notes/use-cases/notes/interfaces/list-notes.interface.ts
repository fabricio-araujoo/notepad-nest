import { NoteEntity } from 'src/modules/notes/entities/note.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export type IListNotesUseCaseInput = {
  user?: UserEntity;
};

export type IListNotesUseCaseOutput = {
  notes: Pick<NoteEntity, '_id' | 'title' | 'content'>[];
};
