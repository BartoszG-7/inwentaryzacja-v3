import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device, DeviceDocument } from './device.schema';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  async create(body: CreateDeviceDto): Promise<Device> {
    let deviceData = body;
    deviceData.deviceType = new Types.ObjectId(deviceData.deviceType);
    console.log('DEVDAT', deviceData);
    return (await this.deviceModel.create(deviceData)).save();
  }
  async deleteMany(data: any): Promise<any> {
    console.log(data);
    return await this.deviceModel.deleteMany({ _id: { $in: data.ids } }).exec();
  }
  async assignedByType(type: string) {
    return await this.deviceModel
      .countDocuments({
        deviceType: new Types.ObjectId(type),
        project: { $ne: null },
      })
      .exec();
  }
  async findId(id: string): Promise<Device[]> {
    return this.deviceModel.find({ deviceType: new Types.ObjectId(id) }).exec();
  }
  async find(query: string): Promise<Device[]> {
    return this.deviceModel.find(JSON.parse(query)).exec();
  }

  async delete(id: string): Promise<string> {
    await this.deviceModel.deleteOne({ _id: id }).exec();
    return 'OK';
  }

  async update(id: string, body: UpdateDeviceDto): Promise<any> {
    console.log(id, body);
    return await this.deviceModel
      .updateOne({ _id: new Types.ObjectId(id) }, body)
      .exec();
  }
  // async deleteMany(filter: any): Promise<string> {
  //   await this.deviceModel.deleteMany(filter).exec();
  //   return 'OK';
  // }

  async updateMany(filter: any, body: UpdateDeviceDto): Promise<string> {
    await this.deviceModel.updateMany(filter, body).exec();
    return 'OK';
  }
  async searchProject(data: any) {
    return await this.deviceModel
      .find({
        $and: [
          { project: data.projectId },
          { [data.param]: { $regex: data.query, $options: 'i' } },
        ],
      })
      .exec();
  }
}
