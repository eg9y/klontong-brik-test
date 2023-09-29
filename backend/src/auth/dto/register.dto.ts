import { IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(8, 128)
  password: string;
}
