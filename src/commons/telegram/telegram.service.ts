import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { LoggerService } from '@commons/logger/logger.service';

@Injectable()
export class TelegramService {
  private readonly token = '758454098:AAEZKyltBGrDSpq19KaunrKkz7pKs3Htp0E';
  private chatId: number;

  private bot: TelegramBot;

  constructor(private readonly logger: Logger) {
    this.bot = new TelegramBot(this.token, {
      polling: true,
      request: { proxy: 'http://127.0.0.1:8118', url: '' },
    });

    this.bot.on('message', msg => {
      this.chatId = msg.chat.id;
    });

    this.bot.on('error', err => {
      this.logger.error(err.message);
    });
  }

  public sendMessage(message: string) {
    return this.bot
      .sendMessage(this.chatId, message)
      .catch(err => this.logger.error(err));
  }
}
