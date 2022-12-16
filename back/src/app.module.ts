import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      // entities: [ './**/*.entity{.ts,.js}'],
      // migrations: ['./database/migrations/**/*{.ts,.js}'],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true, // TODO: deprecated 됨
      charset: 'utf8mb4',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
