import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableSignInException extends HttpException {
  constructor() {
    super('Unable to sign in', HttpStatus.CONFLICT);
  }
}
