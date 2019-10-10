import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { AsyncMqttClient, Packet } from 'async-mqtt';

@Injectable()
export class IoTAgentGateway implements OnModuleInit {
  constructor(
    @Inject('MQTT_CONNECTION') private readonly mqttClient: AsyncMqttClient,
  ) {}

  async onModuleInit() {
    await this.mqttClient.subscribe('sensors');

    this.mqttClient.on(
      'message',
      (topic: string, payload: Buffer, packet: Packet) => {
        console.log(payload.toString());
      },
    );
  }

  // this.mqttClient.on('connect', async () => {
  //   try {
  //     this.mqttClient.subscribe('sensor');
  //     console.log('Подписка оформлена');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // this.mqttClient.on('message', (topic, message) => {
  //   console.log(message.toString());
  // });
  //}
}
