export class CreateParticipantRequestDto {
  public userId: string;
  public sessionId: string;
  public role: 'PLAYER' | 'MASTER';
}
