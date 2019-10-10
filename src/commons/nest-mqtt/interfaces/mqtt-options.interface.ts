import { IClientOptions } from 'async-mqtt';

export interface MqttOptionsInterface extends Partial<IClientOptions> {
  name?: string;
}
