import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { JwtModule } from "@nestjs/jwt";
import { ClientController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  }),
    ClientModule],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule { }
