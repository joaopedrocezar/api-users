import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  async createUser(@Body() createUserDto: { name: string; email: string }) {
    return this.appService.createUser(createUserDto);
  }

  @Get('users')
  async getAllUsers() {
    return this.appService.getAllUsers();
  }
}
