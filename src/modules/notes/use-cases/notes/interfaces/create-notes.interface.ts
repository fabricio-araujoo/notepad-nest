import { NoteEntity } from 'src/modules/notes/entities/note.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export type ICreateNotesUseCaseInput = {
  user?: UserEntity;
  title: string;
  content: string;
};

export type ICreateNotesUseCaseOutput = Omit<NoteEntity, 'user'>;
