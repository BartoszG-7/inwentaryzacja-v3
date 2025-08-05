import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateProjectHistoryDto } from './dto/create-project-history.dto';
import { ProjectHistory, ProjectHistoryDocument } from './project-history.schema'
import { UpdateProjectHistoryDto } from './dto/update-project-history.dto';

@Injectable()
export class ProjectHistoryService {
    constructor(@InjectModel(ProjectHistory.name) private ProjectHistoryModel: Model<ProjectHistory>) { }


    async create(body: CreateProjectHistoryDto): Promise<ProjectHistory> {
        const createdProjectHistory = new this.ProjectHistoryModel(body);
        return createdProjectHistory.save();

    }

    async find(query: string): Promise<ProjectHistory[]> {
        return this.ProjectHistoryModel.find(JSON.parse(query)).exec();
    }

    async delete(id: string): Promise<string> {
        this.ProjectHistoryModel.deleteMany({"id":id}).exec();
        return "OK";
    }

    async update(id: string, body: UpdateProjectHistoryDto): Promise<string> {
        this.ProjectHistoryModel.updateMany({"id":id}, body).exec();
        return "OK";
    }
}

