import { UserResponseDto } from 'src/users/dtos/user.response.dto';

export class DashboardSessionResponseDto {
  public id: string;
  public startDate: Date;
  public title: string;
  public maxPlayers: number | null;
  public playerCount: number;
  public master: UserResponseDto | null;
}
