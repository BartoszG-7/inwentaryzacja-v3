import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { ProjectHistoryService } from './project-history.service';
import { CreateProjectHistoryDto } from './dto/create-project-history.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateProjectHistoryDto } from './dto/update-project-history.dto';
@Controller('/projectHistory')
export class ProjectHistoryController {
    constructor(private readonly ProjectHistoryService: ProjectHistoryService) { }


    @Post('')
    async postCreate(@Body() body: CreateProjectHistoryDto) {
        return await this.ProjectHistoryService.create(body);
    }

    @Get(':query')
    async getFind(@Param("query") query: string) {
        return await this.ProjectHistoryService.find(query);
    }

    @Delete(':id')
    async getDelete(@Param("id") id: string) {
        return await this.ProjectHistoryService.delete(id);
    }

    @Patch(':id')
    async postUpdate(@Param("id") id: string, @Body() body: UpdateProjectHistoryDto) {
        return await this.ProjectHistoryService.update(id, body);
    }
}
