import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config({ path: '.env' })
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'foodSub',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}