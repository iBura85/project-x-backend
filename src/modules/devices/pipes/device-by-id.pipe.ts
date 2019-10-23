import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class DeviceByIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    return {
      device: 'sesnor123',
      userId: '159b2f10-7b0c-44e3-952f-dad383f518f3',
    };
  }
}
