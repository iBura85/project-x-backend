import { IsDefined, IsString } from 'class-validator';

export class PublishMessageDto {
  @IsDefined()
  payload: any;

  @IsDefined()
  @IsString()
  topic: string;
}
