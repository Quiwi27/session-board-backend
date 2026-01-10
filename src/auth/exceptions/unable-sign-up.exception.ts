import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableSignUpException extends HttpException {
  constructor() {
    super('Unable to sign up', HttpStatus.CONFLICT);
  }
}
