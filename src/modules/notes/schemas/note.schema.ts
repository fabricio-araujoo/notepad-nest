import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ECollections } from 'src/core/enums/collections';
import { NoteEntity } from '../entities/note.entity';

export type NoteDocument = Note & Document;

@Schema({
  collection: ECollections.NOTAS,
  versionKey: false,
  timestamps: true,
})
export class Note extends NoteEntity {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: ECollections.USUARIOS, required: true })
  user: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
