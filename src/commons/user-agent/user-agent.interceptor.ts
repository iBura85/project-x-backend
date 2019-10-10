import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { Observable } from 'rxjs';

export class UserAgentInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // получаем объект Request
    const request = context.switchToHttp().getRequest();

    // устанавливаем значение поля ua, результат работы библиотеки ua-parser-js
    request.ua = new UAParser(request.headers['user-agent']).getResult();

    return next.handle();
  }
}
