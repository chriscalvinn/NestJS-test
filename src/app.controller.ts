import { Controller, Get, UseGuards, Post,  Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('json')
  getJson(): {message: string}{
    return this.appService.getHelloJson();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() bod:{username: string, password: string}){
    return this.authService.login(bod);
  }
}
