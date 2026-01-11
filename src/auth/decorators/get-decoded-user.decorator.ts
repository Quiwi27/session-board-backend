import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DecodedJwtUserDto } from '../dtos/decoded-jwt-user.dto';

interface RequestWithUser extends Request {
  user: DecodedJwtUserDto;
}

export const GetDecodedUser = createParamDecorator((_data: unknown, context: ExecutionContext): DecodedJwtUserDto => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
});
