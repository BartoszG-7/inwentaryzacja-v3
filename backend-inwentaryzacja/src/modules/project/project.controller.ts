import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller('/project')
export class ProjectController {
    constructor(private readonly ProjectService: ProjectService) { }


    @Post('')
    async postCreate(@Body() body: CreateProjectDto) {
        this.ProjectService.create(body);
    }

    @Get(':query')
    async getFind(@Param("query") query: string) {
        return this.ProjectService.find(query);
    }

    @Delete(':query')
    async getDelete(@Param("query") query: string) {
        return this.ProjectService.delete(query);
    }

    @Patch(':query')
    async postUpdate(@Param("query") query: string, @Body() body: UpdateProjectDto) {
        this.ProjectService.update(query, body);
    }
}
