import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateDeviceDto } from './dto/update-device.dto';
@Controller('/device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }


    @Post('')
    async postCreate(@Body() body: CreateDeviceDto) {
        return await this.deviceService.create(body);
    }
    @Get('unassigned')
    async getUnassigned() {
        return await this.deviceService.unassigned();
    }
    @Get(':query')
    async getFind(@Param("query") query: string) {
        return await this.deviceService.find(query);
    }

    @Delete(':id')
    async getDelete(@Param("id") id: string) {
        return await this.deviceService.delete(id);
    }

    @Patch(':id')
    async postUpdate(@Param("id") id: string, @Body() body: UpdateDeviceDto) {
        return await this.deviceService.update(id, body);
    }
}
