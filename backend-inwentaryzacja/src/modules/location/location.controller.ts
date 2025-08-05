import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.to';
import { RootFilterQuery } from 'mongoose';
import { UpdateLocationDto } from './dto/update-location.dto';
@Controller('/location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }


    @Post('')
    async postCreate(@Body() body: CreateLocationDto) {
        return await this.locationService.create(body);
    }

    @Get(':query')
    async getFind(@Param("query") query: string) {
        return await this.locationService.find(query);
    }

    @Delete(':id')
    async getDelete(@Param("id") id: string) {
        return await this.locationService.delete(id);
    }

    @Patch(':id')
    async postUpdate(@Param("id") id: string, @Body() body: UpdateLocationDto) {
        return await this.locationService.update(id, body);
    }
}
