import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './user.schema';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) , LogsModule],
  controllers: [UsersController],
  providers: [UserService], // Make sure UserService is added as a provider
})
export class UsersModule {}
