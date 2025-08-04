import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.to';
import { Location, LocationDocment } from './location.schema';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }


    async create(body: CreateLocationDto): Promise<String> {
        const createdLocation = new this.locationModel(body);
        createdLocation.save();
        return "OK";
    }

    async find(query: string): Promise<Location[]> {
        return this.locationModel.find(JSON.parse(query)).exec();
    }

    async delete(query: string): Promise<string> {
        this.locationModel.deleteMany(JSON.parse(query)).exec();
        return "OK";
    }

    async update(query: string, body: UpdateLocationDto): Promise<string> {
        this.locationModel.updateMany(JSON.parse(query), body).exec();
        return "OK";
    }
}

