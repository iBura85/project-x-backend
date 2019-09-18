import { NestFactory } from '@nestjs/core';
import { SeederModule } from '@commons/database/seeders/seeder.module';
import { Seeder } from '@commons/database/seeders/seeder';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  // создает инстанс приложения Nest
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  // извлекает экземляр Сидера и Логгера
  const seeder = appContext.get(Seeder);
  const logger = appContext.get(Logger);

  try {
    // заполняет БД данными
    await seeder.seed();
    logger.debug('Заполнение БД выполнено успешно!!!');
  } catch (err) {
    logger.error('Ошибка в заполнении БД', err.message);
  }
}
bootstrap();
