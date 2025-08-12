import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/findAll')
  async findAll() {
    return this.appService.findAll();
  }
}
