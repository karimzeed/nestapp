import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_CONNECTION_STRING,
      }),
    }), UsersModule, LogsModule, CacheModule.register() , ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
