import { Controller, Post, Body } from '@nestjs/common';
import { IPublishPacket } from 'async-mqtt';
import { IoTAgentService } from './iot-agent.service';
import { PublishMessageDto } from './dto/publish-message.dto';

@Controller('iot-agent')
export class IoTAgentController {
  constructor(private readonly agent: IoTAgentService) {}

  @Post('publish')
  public publish(@Body() data: PublishMessageDto): Promise<IPublishPacket> {
    return this.agent.publish(data.topic, data.payload);
  }
}
