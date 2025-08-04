import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { DeviceType, DeviceTypeDocument } from './device-type.schema'
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';

@Injectable()
export class DeviceTypeService {
    constructor(@InjectModel(DeviceType.name) private deviceTypeModel: Model<DeviceType>) { }


    async create(body: CreateDeviceTypeDto): Promise<DeviceType> {
        const createddeviceType = new this.deviceTypeModel(body);
        return createddeviceType.save();

    }

    async find(query: string): Promise<DeviceType[]> {
        return this.deviceTypeModel.find(JSON.parse(query)).exec();
    }

    async delete(id: string): Promise<string> {
        this.deviceTypeModel.deleteMany({"id":id}).exec();
        return "OK";
    }

    async update(id: string, body: UpdateDeviceTypeDto): Promise<string> {
        this.deviceTypeModel.updateMany({"id":id}, body).exec();
        return "OK";
    }
}

