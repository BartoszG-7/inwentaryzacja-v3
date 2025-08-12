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
    const createddevice = new this.deviceModel(body);
    return createddevice.save();
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

  async update(id: string, body: UpdateDeviceDto): Promise<string> {
    await this.deviceModel.updateOne({ _id: id }, body).exec();
    return 'OK';
  }
  async deleteMany(filter: any): Promise<string> {
    await this.deviceModel.deleteMany(filter).exec();
    return 'OK';
  }

  async updateMany(filter: any, body: UpdateDeviceDto): Promise<string> {
    await this.deviceModel.updateMany(filter, body).exec();
    return 'OK';
  }
}
