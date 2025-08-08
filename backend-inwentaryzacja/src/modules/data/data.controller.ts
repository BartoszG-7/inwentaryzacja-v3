import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
    constructor(private readonly dataService: DataService) { }


    @Get('treebar')
    async getTreebar() {
        return await this.dataService.treebar();
    }
    @Get('home')
    async getHome() {
        return await this.dataService.home();
    }
}
