import { Injectable, Scope } from '@nestjs/common';

/**
 * Сервис логгера.
 * Инстанс сервиса создается для каждого внедрения.
 */
@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  private prefix?: string;

  log(message: string): void {
    let formattedMessage = message;

    if (this.prefix) {
      formattedMessage = `[${this.prefix}] ${message}`;
    }

    console.log(formattedMessage);
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }
}
