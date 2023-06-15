import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
