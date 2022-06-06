"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
require('dotenv').config({ path: '.env' });
async function bootstrap() {
    const PORT = process.env.PORT || 8000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('v1');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Food subscription API')
        .setDescription('Food subscription api with Nest Js')
        .setVersion('0.0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    });
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map