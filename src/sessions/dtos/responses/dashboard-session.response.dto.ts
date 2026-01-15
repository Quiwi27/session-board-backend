import { UserResponseDto } from 'src/users/dtos/user.response.dto';

export class DashboardSessionResponseDto {
  public id: string;
  public startDate: Date;
  public title: string;
  public maxPlayers: number | null;
  public participants: DashboardParticipantSessionResponseDto[];
}

export class DashboardParticipantSessionResponseDto {
  public id: string;
  public sessionId: string;
  public role: 'PLAYER' | 'MASTER';
  public user: UserResponseDto;
}
