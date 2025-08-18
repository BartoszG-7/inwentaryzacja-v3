import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';

import { Device, DeviceDocument } from '../device/device.schema';

import { Project } from '../project/project.schema';
import { Location } from '../location/location.schema';
import { ProjectHistory } from '../project-history/project-history.schema';
import { DeviceType } from '../device-type/device-type.schema';
import type { ObjectId } from 'mongoose';
export enum projectHistoryEvents {
  PROJECT_CREATED = 1,
  DEVICE_ADDED_TO_PROJECT = 2,
  DEVICE_REMOVED_FROM_PROJECT = 3,
}
@Injectable()
export class DataService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
    @InjectModel(Location.name) private LocationModel: Model<Location>,
    @InjectModel(ProjectHistory.name)
    private ProjectHistoryModel: Model<ProjectHistory>,
    @InjectModel(DeviceType.name) private DeviceTypeModel: Model<DeviceType>,
  ) {}
  async getProjectData(id: string): Promise<any> {
    return {
      project: await this.ProjectModel.find({ _id: id }).exec(),
      devices: await this.deviceModel
        .find({ project: id })
        .populate('deviceType')
        .exec(),
    };
  }
  async treebar(): Promise<any> {
    return {
      projects: await this.ProjectModel.find({}).select('name location').exec(),
      locations: await this.LocationModel.find({}).exec(),
    };
  }

  /*  async inventoryList(): Promise<any> {
  
  
          return (this.DeviceTypeModel.find({}).select("name"));
      }*/
  async home(): Promise<any> {
    // Get the 5 newest distinct project history records by project
    const modified = await this.ProjectHistoryModel.aggregate([
      {
        $group: {
          _id: '$project',
          doc: { $first: '$$ROOT' },
        },
      },
      { $replaceRoot: { newRoot: '$doc' } },
    ])
      .sort({ date: -1 })
      .limit(5)
      .exec();

    // Populate project and location fields
    const populatedModified = await this.ProjectHistoryModel.populate(
      modified,
      [{ path: 'project', populate: { path: 'location', model: 'Location' } }],
    );

    return {
      stock: await this.deviceModel
        .find({ project: null })
        .populate('deviceType', ['name'])
        .where('deviceType')
        .ne(null)
        .select('name deviceType')
        .exec(),
      modified: populatedModified,
      //   modified: await this.ProjectHistoryModel.find({})
      //     .populate('project')
      //     .populate({
      //       path: 'project',
      //       populate: { path: 'location', model: 'Location' },
      //     })
      //     .sort({ date: -1 })
      //     .limit(5)
      //     .exec(),
    };
  }
  async addProject(projectData: any): Promise<any> {
    return this.ProjectHistoryModel.create({
      type: projectHistoryEvents.PROJECT_CREATED,
      date: new Date().toISOString(),
      tag: '',
      project: (await this.ProjectModel.create(projectData))._id,
    });
  }
  async assignDevice(data: any): Promise<any> {
    return {
      projectHistory: await this.ProjectHistoryModel.create({
        type: projectHistoryEvents.DEVICE_ADDED_TO_PROJECT,
        date: new Date().toISOString(),
        tag: '',
        deviceId: data.deviceId,
        project: data.projectId,
      }),
      device: await this.deviceModel.updateOne(
        { _id: data.deviceId },
        { project: data.projectId },
      ),
    };
  }
  async unassignDevice(data: any): Promise<any> {
    return {
      projectHistory: await this.ProjectHistoryModel.create({
        type: projectHistoryEvents.DEVICE_REMOVED_FROM_PROJECT,
        date: new Date().toISOString(),
        tag: '',
        deviceId: data.deviceId,
        project: data.projectId,
      }),
      device: await this.deviceModel.updateOne(
        { _id: data.deviceId },
        { $unset: { project: '' } },
      ),
    };
  }
}
