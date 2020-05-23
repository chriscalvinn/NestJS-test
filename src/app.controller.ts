import { Controller, Get, UseGuards, Post,  Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('json')
  getJson(): {message: string}{
    return this.appService.getHelloJson();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() bod:{username: string, password: string}){
    return bod;
  }
}
