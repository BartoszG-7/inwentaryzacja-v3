import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';

import { Device, DeviceDocument } from '../device/device.schema'

import { Project } from '../project/project.schema';
import { Location } from '../location/location.schema';
import { ProjectHistory } from '../project-history/project-history.schema';
@Injectable()
export class DataService {
    constructor(@InjectModel(Device.name) private deviceModel: Model<Device>, @InjectModel(Project.name) private ProjectModel: Model<Project>, @InjectModel(Location.name) private LocationModel: Model<Location>, @InjectModel(ProjectHistory.name) private ProjectHistoryModel: Model<ProjectHistory>) { }

    async treebar(): Promise<any> {


        return ({ projects: await this.ProjectModel.find().select("name location").exec(), locations: await this.LocationModel.find().select("name").exec() });

    }
    async home(): Promise<any> {




        return ({ stock: await this.deviceModel.find({ project: null }).populate("deviceType", ["name"]).where("deviceType").ne(null).select("name deviceType").exec(), modified: await this.ProjectHistoryModel.find({}).populate("project").populate({ path: "project", populate: { path: "location", model: "Location" } }).sort({ "date": -1 }).limit(5).exec() });
    }
}

