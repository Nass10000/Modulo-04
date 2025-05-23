// src/config/database.config.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 

export const databaseConfig = [
  ConfigModule.forRoot({ 
    isGlobal: true,
    envFilePath: '.env.development',
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
  }),
];
