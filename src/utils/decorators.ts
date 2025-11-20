import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RESPONSE_MESSAGE } from './interceptors';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.user!;
});

export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);
