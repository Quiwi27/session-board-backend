import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionNotFoundException extends HttpException {
  constructor() {
    super('Session not found', HttpStatus.NOT_FOUND);
  }
}

export class UserAleadyJoinedSessionException extends HttpException {
  constructor() {
    super('User has already joined the session', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class EnoughtCountPlayersException extends HttpException {
  constructor() {
    super('There are already enough players in the session.', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
