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
        this.locationService.create(body);
    }

    @Get(':query')
    async getFind(@Param("query") query: string) {
        return this.locationService.find(query);
    }

    @Delete(':query')
    async getDelete(@Param("query") query: string) {
        return this.locationService.delete(query);
    }

    @Patch(':query')
    async postUpdate(@Param("query") query: string, @Body() body: UpdateLocationDto) {
        this.locationService.update(query, body);
    }
}
