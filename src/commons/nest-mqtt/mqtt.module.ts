import * as MQTT from 'async-mqtt';
import { DynamicModule } from '@nestjs/common';

import { MqttOptionsInterface } from './interfaces';
import { MQTT_CONNECTION_PROVIDER } from './mqtt.constans';

export class MqttModule {
  public static register(
    brokerUrl: string,
    options?: MqttOptionsInterface,
  ): DynamicModule {
    /**
     * Connection Provider
     */
    const connectionProvider = {
      provide: MQTT_CONNECTION_PROVIDER,
      useFactory: (): Promise<MQTT.AsyncMqttClient> =>
        this.createConnectionFactory(brokerUrl, options),
    };

    return {
      module: MqttModule,
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }

  private static createConnectionFactory(
    brokerUrl: string,
    options: MqttOptionsInterface,
  ): Promise<MQTT.AsyncMqttClient> {
    return MQTT.connectAsync(brokerUrl, options);
  }
}
