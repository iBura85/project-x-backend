import { Injectable, Inject } from '@nestjs/common';
import { AsyncMqttClient, IPublishPacket } from 'async-mqtt';

@Injectable()
export class IoTAgentService {
  constructor(
    @Inject('MQTT_CONNECTION') private readonly mqttClient: AsyncMqttClient,
  ) {}

  /**
   * Опубликовать сообщение
   * @param topic
   * @param message
   */
  public publish(topic: string, payload: string): Promise<IPublishPacket> {
    const _payload = JSON.stringify(payload);

    return this.mqttClient.publish(topic, _payload);
  }
}
