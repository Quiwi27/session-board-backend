import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
