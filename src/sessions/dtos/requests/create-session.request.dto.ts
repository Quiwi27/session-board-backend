import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSessionRequestDto {
  @IsDate()
  @Type(() => Date)
  public startDate: Date;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNumber()
  public maxPlayers: number;

  @IsUUID()
  public creatorId: string;
}

export class CreateSessionOmitCreatorRequestDto {
  @IsDate()
  @Type(() => Date)
  public startDate: Date;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNumber()
  public maxPlayers: number;
}
