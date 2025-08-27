import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';

import { Device, DeviceDocument } from '../device/device.schema';

import { Project } from '../project/project.schema';
import { Location } from '../location/location.schema';
import { ProjectHistory } from '../project-history/project-history.schema';
import { DeviceType } from '../device-type/device-type.schema';
import type { ObjectId } from 'mongoose';
import { LocationService } from '../location/location.service';
export enum projectHistoryEvents {
  PROJECT_CREATED = 1,
  DEVICE_ADDED_TO_PROJECT = 2,
  DEVICE_REMOVED_FROM_PROJECT = 3,
  PROJECT_REMOVED = 4,
  PROJECT_EDITED = 5,
  DEVICE_EDITED = 6,
}

export enum searchModerators {
  FIRST_COLUMN = '!',
  SECOND_COLUMN = '@',
  THIRD_COLUMN = '$',
}
@Injectable()
export class DataService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
    @InjectModel(Location.name) private LocationModel: Model<Location>,
    @InjectModel(ProjectHistory.name)
    private ProjectHistoryModel: Model<ProjectHistory>,
    private locationService: LocationService,
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
    let tempRes = await this.LocationModel.find({}).exec();
    let finalRes: any = [];
    tempRes.forEach((element) => {
      let tempEl = JSON.parse(JSON.stringify(element));
      tempEl.address = this.locationService.addrToString(element.address);
     
      finalRes.push({ ...tempEl });
    });
    return {
      projects: await this.ProjectModel.find({}).select('name location').exec(),
      locations: finalRes,
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
  async addProjectHistory(projectId: any): Promise<any> {
    return this.ProjectHistoryModel.create({
      type: projectHistoryEvents.PROJECT_CREATED,
      date: new Date().toISOString(),
      tag: '',
      project: projectId,
    });
  }
  async addProject(projectData: any): Promise<any> {
    return await this.ProjectModel.create(projectData);
  }
  async addProjectAndHistory(projectData: any): Promise<any> {
    let projID = await this.addProject(projectData);
    return this.addProjectAndHistory(projID);
  }
  async assignDevice(data: any): Promise<any> {
    console.log('ASSGN', data);
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
  async globalSearch(data: string) {
    console.log(data);
    switch (data[0]) {
      case searchModerators.FIRST_COLUMN:
        return await this.deviceModel
          .find({ wamaNr: { $regex: data.slice(1), $options: 'i' } })
          .populate('project')
          .exec();

      case searchModerators.SECOND_COLUMN:
        return await this.deviceModel
          .find({ serialNr: { $regex: data.slice(1), $options: 'i' } })
          .populate('project')
          .exec();

      case searchModerators.THIRD_COLUMN:
        return await this.deviceModel
          .find({ macAddr: { $regex: data.slice(1), $options: 'i' } })
          .populate('project')
          .exec();
    }
  }
  async getDeviceList(typeId: any) {
    return {
      device: await this.deviceModel
        .find({
          deviceType: new Types.ObjectId(typeId),
        })
        .populate({
          path: 'project',
          select: ['name', 'location'],
          populate: { path: 'location', select: ['name'] },
        })
        .exec(),
      deviceType: (
        await this.DeviceTypeModel.find({
          _id: new Types.ObjectId(typeId),
        })
      )[0],
    };
  }
  async unassignMany(data: any): Promise<any> {
    data = JSON.parse(data);
    data.ids.forEach((id) => {
      this.ProjectHistoryModel.create({
        type: projectHistoryEvents.DEVICE_REMOVED_FROM_PROJECT,
        date: new Date().toISOString(),
        tag: '',
        deviceId: id,
        project: data.projectId,
      });
    });
    return await this.deviceModel
      .updateMany({ _id: { $in: data.ids } }, { $unset: { project: '' } })
      .exec();
  }
  async assignCreateDevice(data: any): Promise<any> {
    let device = await this.deviceModel.create(data);

    return {
      projectHistory: await this.ProjectHistoryModel.create({
        type: projectHistoryEvents.DEVICE_ADDED_TO_PROJECT,
        date: new Date().toISOString(),
        tag: '',
        deviceId: device._id,
        project: data.project,
      }),
      device: device,
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
