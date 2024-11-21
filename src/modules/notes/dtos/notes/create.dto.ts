import { IsString } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
