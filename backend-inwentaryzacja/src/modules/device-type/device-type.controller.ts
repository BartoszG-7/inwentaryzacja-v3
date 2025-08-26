import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { DeviceTypeService } from './device-type.service';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
@Controller('/device-type')
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Post('')
  async postCreate(@Body() body: CreateDeviceTypeDto) {
    return await this.deviceTypeService.create(body);
  }

  @Get('list')
  async getList() {
    return await this.deviceTypeService.list();
  }
  @Get(':query')
  async getFind(@Param('query') query: string) {
    return await this.deviceTypeService.find(query);
  }

  @Delete(':id')
  async getDelete(@Param('id') id: string) {
    return await this.deviceTypeService.delete(id);
  }

  @Patch(':id')
  async postUpdate(@Param('id') id: string, @Body() body: UpdateDeviceTypeDto) {
    return await this.deviceTypeService.update(id, body);
  }
}
