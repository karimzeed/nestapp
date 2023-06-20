import { CacheTTL, HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { logger } from '../logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('Username or password incorrect', HttpStatus.UNAUTHORIZED);
    }    

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new HttpException('Username or password incorrect', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign({ email }, 'secret-key', { expiresIn: '6h' });
    logger.info(`User ${email} logged in`);
    return { token };
  }

  @CacheTTL(60) // Set the cache TTL for this method (in seconds)
  @UseInterceptors(CacheInterceptor) // Apply the caching interceptor
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // setInterval(() => {
    //   console.log("Here !!" , user)
    // }, 2000);
    return user;
  }
  // async getUserById(id: string) {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   setInterval(() => {
  //     console.log("Here !!" , user)
  //   }, 2000);
  //   return user;
  // }
  async getUsers() {
      const user = await this.userModel.find().exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    }
  
}
