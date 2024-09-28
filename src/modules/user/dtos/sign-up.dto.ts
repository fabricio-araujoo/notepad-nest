import { IsDateString, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: Date;
}
