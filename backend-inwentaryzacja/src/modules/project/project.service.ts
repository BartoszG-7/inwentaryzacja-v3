import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocment } from './project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private ProjectModel: Model<Project>) { }


    async create(body: CreateProjectDto): Promise<Project> {
        const createdProject = new this.ProjectModel(body);
        return createdProject.save();
    }

    async find(query: string): Promise<Project[]> {
        return this.ProjectModel.find(JSON.parse(query)).exec();
    }

    async delete(id: string): Promise<string> {
        this.ProjectModel.deleteMany({ "id": id }).exec();
        return "OK";
    }

    async update(id: string, body: UpdateProjectDto): Promise<string> {
        this.ProjectModel.updateMany({ "id": id }, body).exec();
        return "OK";
    }
}

