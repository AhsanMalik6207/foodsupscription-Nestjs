import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { JwtModule } from "@nestjs/jwt";
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  }),AdminModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }