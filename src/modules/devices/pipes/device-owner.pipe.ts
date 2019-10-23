import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class DeviceOwnerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value \n');
    console.log(value);

    console.log('Metadata^ \n');
    console.log(metadata);
  }
}
