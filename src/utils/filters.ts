import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DrizzleQueryError } from 'drizzle-orm';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log({ exception: String(exception) });
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: unknown =
      exception instanceof HttpException
        ? exception.getResponse()['message'] || exception.getResponse()
        : exception instanceof DrizzleQueryError
          ? exception.cause?.message || 'Query error'
          : 'Internal server error';

    response.status(status).json({
      status: false,
      message: Array.isArray(message) ? message.join(', ') : message,
      records: [],
    });
  }
}
