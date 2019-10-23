import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from '@commons/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';

import { LoggerModule } from './commons/logger/logger.module';
import { RegistrationModule } from '@modules/auth/registration/registration.module';
import { MqttModule } from '@commons/nest-mqtt/mqtt.module';
import { IoTAgentModule } from '@modules/iot-agent/iot-agent.module';
import { ApiModule } from './api.module';

@Module({
  imports: [
    // IoTAgentModule,
    //AuthModule,
    ApiModule,
    DatabaseModule,
    //UsersModule,
    LoggerModule,
    //RegistrationModule,
  ],
  // controllers: [AppController],
})
export class AppModule {}
