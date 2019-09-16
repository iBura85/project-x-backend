import { NestFactory } from '@nestjs/core';
import { SeederModule } from '@commons/database/seeders/seeder.module';
import { Seeder } from '@commons/database/seeders/seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
