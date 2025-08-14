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
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  /* @Get('inventory-list')
     async getInventoryList() {
         return await this.dataService.inventoryList();
     }*/
  @Get('treebar')
  async getTreebar() {
    return await this.dataService.treebar();
  }
  @Get('get-project-data/:id')
  async getProjectData(@Param('id') id: string) {
    return await this.dataService.getProjectData(id);
  }
  @Get('home')
  async getHome() {
    return await this.dataService.home();
  }
  @Post('add-project')
  async addProject(@Body() projectData: any) {
    return await this.dataService.addProject(projectData);
  }
  @Post('add-device-to-project')
  async assignDevice(@Body() data: any) {
    return await this.dataService.assignDevice(data);
  }
  @Post('remove-device-from-project')
  async unassignDevice(@Body() data: any) {
    return await this.dataService.unassignDevice(data);
  }
}
