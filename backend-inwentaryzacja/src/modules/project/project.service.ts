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
        if (query === "treebar") {

            return this.ProjectModel.find().select("name location").exec();
        } else if (query === "modified") {
            return this.ProjectModel.find().select({ "name": 1, "projects.name": 1, "projects.projectHistory.date": 1 }).exec();
        } else {
            return this.ProjectModel.find(JSON.parse(query)).exec();
        }
    }

    async delete(id: string): Promise<string> {
        await this.ProjectModel.deleteOne({ _id: id }).exec();
        return "OK";
    }

    async update(id: string, body: UpdateProjectDto): Promise<string> {
        await this.ProjectModel.updateOne({ _id: id }, body).exec();
        return "OK";
    }
    async deleteMany(filter: any): Promise<string> {
        await this.ProjectModel.deleteMany(filter).exec();
        return "OK";
    }

    async updateMany(filter: any, body: UpdateProjectDto): Promise<string> {
        await this.ProjectModel.updateMany(filter, body).exec();
        return "OK";
    }
}

