import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsString()
  password: string;
}
