import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

require('dotenv').config({ path: '.env' })
async function bootstrap() {
  const PORT = process.env.PORT || 8000
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  const options = new DocumentBuilder()
    .setTitle('Food subscription API')
    .setDescription('Food subscription api with Nest Js')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  await app.listen(PORT);
}
bootstrap();