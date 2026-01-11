export class ParticipantResponseDto {
  public id: string;
  public sessionId: string;
  public role: 'PLAYER' | 'MASTER';
  public userId: string;
}
