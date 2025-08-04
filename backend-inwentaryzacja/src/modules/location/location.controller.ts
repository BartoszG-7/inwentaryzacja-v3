import { Controller, Get, Post, Req } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('/location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }


    @Post('/create')
    async createCaller(@Req() request: any) {
        console.log(request.body);
        //return request.body;
        this.locationService.createPost(request.body);
    }
}
