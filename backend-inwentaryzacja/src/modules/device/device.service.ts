import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device, DeviceDocument } from './device.schema'
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
    constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) { }


    async create(body: CreateDeviceDto): Promise<Device> {
        const createddevice = new this.deviceModel(body);
        return createddevice.save();

    }

    async find(query: string): Promise<Device[]> {
        return this.deviceModel.find(JSON.parse(query)).exec();
    }

    async delete(id: string): Promise<string> {
        this.deviceModel.deleteMany({"id":id}).exec();
        return "OK";
    }

    async update(id: string, body: UpdateDeviceDto): Promise<string> {
        this.deviceModel.updateMany({"id":id}, body).exec();
        return "OK";
    }
}

