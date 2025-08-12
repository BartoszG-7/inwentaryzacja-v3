import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { DeviceType, DeviceTypeDocument } from './device-type.schema';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';

@Injectable()
export class DeviceTypeService {
  constructor(
    @InjectModel(DeviceType.name) private deviceTypeModel: Model<DeviceType>,
  ) {}

  async create(body: CreateDeviceTypeDto): Promise<DeviceType> {
    const createddeviceType = new this.deviceTypeModel(body);
    return createddeviceType.save();
  }
  async list(): Promise<any> {
    return {
      locations: await this.deviceTypeModel.find({}).select('name').exec(),
    };
  }
  async find(query: string): Promise<DeviceType[]> {
    return this.deviceTypeModel.find(JSON.parse(query)).exec();
  }

  async delete(id: string): Promise<string> {
    await this.deviceTypeModel.deleteOne({ _id: id }).exec();
    return 'OK';
  }

  async update(id: string, body: UpdateDeviceTypeDto): Promise<string> {
    await this.deviceTypeModel.updateOne({ _id: id }, body).exec();
    return 'OK';
  }
  async deleteMany(filter: any): Promise<string> {
    await this.deviceTypeModel.deleteMany(filter).exec();
    return 'OK';
  }

  async updateMany(filter: any, body: UpdateDeviceTypeDto): Promise<string> {
    await this.deviceTypeModel.updateMany(filter, body).exec();
    return 'OK';
  }
}
