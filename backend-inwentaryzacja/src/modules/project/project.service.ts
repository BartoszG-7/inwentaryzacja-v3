import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocment } from './project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Location } from '../location/location.schema';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
    @InjectModel(Location.name) private LocationModel: Model<Project>,
  ) {}

  async create(body: CreateProjectDto): Promise<Project> {
    const createdProject = new this.ProjectModel(body);
    return createdProject.save();
  }
  async modified(): Promise<Project[]> {
    return this.ProjectModel.find()
      .select({
        name: 1,
        'projects.name': 1,
        'projects.projectHistory.date': 1,
      })
      .exec();
  }
  async find(query: string): Promise<Project[]> {
    return this.ProjectModel.find(JSON.parse(query)).exec();
  }

  async delete(id: string): Promise<string> {
    await this.ProjectModel.deleteOne({ _id: id }).exec();
    return 'OK';
  }

  async update(id: string, body: UpdateProjectDto): Promise<any> {
    return await this.ProjectModel.updateOne({ _id: id }, body).exec();
  }
  async deleteMany(filter: any): Promise<string> {
    await this.ProjectModel.deleteMany(filter).exec();
    return 'OK';
  }

  async updateMany(filter: any, body: UpdateProjectDto): Promise<string> {
    await this.ProjectModel.updateMany(filter, body).exec();
    return 'OK';
  }
}
