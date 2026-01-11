export class CreateParticipantDto {
  public userId: string;
  public sessionId: string;
  public role: 'PLAYER' | 'MASTER';
}
