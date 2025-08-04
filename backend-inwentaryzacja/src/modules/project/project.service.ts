import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocment } from './project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private ProjectModel: Model<Project>) { }


    async create(body: CreateProjectDto): Promise<String> {
        const createdProject = new this.ProjectModel(body);
        createdProject.save();
        return "OK";
    }

    async find(query: string): Promise<Project[]> {
        return this.ProjectModel.find(JSON.parse(query)).exec();
    }

    async delete(query: string): Promise<string> {
        this.ProjectModel.deleteMany(JSON.parse(query)).exec();
        return "OK";
    }

    async update(query: string, body: UpdateProjectDto): Promise<string> {
        this.ProjectModel.updateMany(JSON.parse(query), body).exec();
        return "OK";
    }
}

