import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller('/project')
export class ProjectController {
    constructor(private readonly ProjectService: ProjectService) { }


    @Post('')
    async create(@Body() body: CreateProjectDto) {
        this.ProjectService.create(body);
    }

    @Get(':query')
    async find(@Param("query") query: string) {
        return this.ProjectService.find(query);
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.ProjectService.delete(id);
    }

    @Patch(':id')
    async update(@Param("id") id: string, @Body() body: UpdateProjectDto) {
        this.ProjectService.update(id, body);
    }
}
