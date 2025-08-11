import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    /* @Get('inventory-list')
     async getInventoryList() {
         return await this.dataService.inventoryList();
     }*/
    @Get('treebar/:query')
    async getTreebar(@Param('query') query: string) {
        return await this.dataService.treebar(query);
    }
    @Get('home')
    async getHome() {
        return await this.dataService.home();
    }
}
