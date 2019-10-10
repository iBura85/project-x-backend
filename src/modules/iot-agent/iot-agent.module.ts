import { Module } from '@nestjs/common';
import { MqttModule } from '@commons/nest-mqtt/mqtt.module';

import { IoTAgentGateway } from './iot-agent.gateway';
import { IoTAgentService } from './iot-agent.service';
import { IoTAgentController } from './iot-agent.controller';

@Module({
  imports: [MqttModule.register('tcp://localhost:1883')],
  providers: [IoTAgentGateway, IoTAgentService],
  controllers: [IoTAgentController],
})
export class IoTAgentModule {}
