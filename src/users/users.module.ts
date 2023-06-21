import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './user.schema';
import { LogsModule } from 'src/logs/logs.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LogsModule,
    HttpModule,
    CacheModule.register({
      store: 'memory', // Choose a caching store (e.g., 'memory', 'redis')
      ttl: 60, // Set the time-to-live for cache entries (in seconds)
    }),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
