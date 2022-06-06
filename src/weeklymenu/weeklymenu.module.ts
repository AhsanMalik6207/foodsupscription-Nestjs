import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklymenuController } from './weeklymenu.controller';
import { WeeklymenuRepository } from './weeklymenu.repository';
import { WeeklymenuService } from './weeklymenu.service';
@Module({
  imports:[TypeOrmModule.forFeature([WeeklymenuRepository]),  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [WeeklymenuController],
  providers: [WeeklymenuService],
})
export class WeeklymenuModule {}