import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends HttpException {
  constructor() {
    super('User with this email already exists', HttpStatus.CONFLICT);
  }
}
