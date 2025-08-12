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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RootFilterQuery } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller('/project')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}

  @Post('')
  async postCreate(@Body() body: CreateProjectDto) {
    return await this.ProjectService.create(body);
  }
  @Get('modified')
  async getModified() {
    return await this.ProjectService.modified();
  }

  @Get(':query')
  async getFind(@Param('query') query: string) {
    return await this.ProjectService.find(query);
  }

  @Delete(':id')
  async getDelete(@Param('id') id: string) {
    return await this.ProjectService.delete(id);
  }

  @Patch(':id')
  async postUpdate(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return await this.ProjectService.update(id, body);
  }
}
