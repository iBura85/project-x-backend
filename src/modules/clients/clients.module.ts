import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [
    { provide: 'REFRESH_TOKEN_EXPIRE_TIME', useValue: 3600 },
    ClientsService,
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
