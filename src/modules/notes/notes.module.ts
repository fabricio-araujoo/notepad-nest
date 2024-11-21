import { Module } from '@nestjs/common';
import { NotesController } from './controller/notes/notes.controller';
import { TagsController } from './controller/tags/tags.controller';
import { ListNotesUseCase } from './use-cases/notes/list-notes.use-case';
import { Note, NoteSchema } from './schemas/note.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateNotesUseCase } from './use-cases/notes/create-notes.use-case';
import { NotesService } from './services/notes/notes.service';
import { NoteRepository } from './repositories/note.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController, TagsController],
  providers: [
    NoteRepository,
    ListNotesUseCase,
    CreateNotesUseCase,
    NotesService,
  ],
})
export class NotesModule {}
