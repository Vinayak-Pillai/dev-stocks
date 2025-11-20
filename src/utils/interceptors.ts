import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const RESPONSE_MESSAGE = 'response_message';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        const dataIsArray = Array.isArray(data);
        return {
          status: dataIsArray && data.length ? true : data ? true : false,
          message: message ?? 'Success',
          records: Array.isArray(data) ? data : data ? [data] : [],
        };
      }),
    );
  }
}
