import { Module, Logger } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { LoggerModule } from '@commons/logger/logger.module';
import { LoggerService } from '@commons/logger/logger.service';

@Module({
  imports: [LoggerModule],
  providers: [TelegramService, Logger],
  exports: [TelegramService],
})
export class TelegramModule {}
