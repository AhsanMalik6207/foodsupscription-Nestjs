import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { PaidinvoiceModule } from './paidinvoice/paidinvoice.module';
import { WeeklymenuModule } from './weeklymenu/weeklymenu.module';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [ConfigModule.forRoot(), ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','client/build'),
  }), TypeOrmModule.forRoot(typeOrmConfig), MulterModule.register({
    dest: './files',
  }), ClientModule, PaymentModule, PaidinvoiceModule, WeeklymenuModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

