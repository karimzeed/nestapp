import { Controller, Post, Body, ValidationPipe, Get, Param } from '@nestjs/common'; // Import the necessary decorators
import { UserService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Cron } from '@nestjs/schedule';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // async login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
  //   return this.userService.login(userLoginDto);
  // }
  
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Cron('5 * * * * *')
  handleCron() {
    console.log('Called when the current second is 5');
  }
}
