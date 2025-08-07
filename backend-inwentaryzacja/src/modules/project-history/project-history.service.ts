import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateProjectHistoryDto } from './dto/create-project-history.dto';
import { ProjectHistory } from './project-history.schema';
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
        await this.ProjectHistoryModel.deleteOne({ _id: id }).exec();
        return "OK";
    }

    async update(id: string, body: UpdateProjectHistoryDto): Promise<string> {
        await this.ProjectHistoryModel.updateOne({ _id: id }, body).exec();
        return "OK";
    }
    async deleteMany(filter: any): Promise<string> {
        await this.ProjectHistoryModel.deleteMany(filter).exec();
        return "OK";
    }

    async updateMany(filter: any, body: UpdateProjectHistoryDto): Promise<string> {
        await this.ProjectHistoryModel.updateMany(filter, body).exec();
        return "OK";
    }
}

