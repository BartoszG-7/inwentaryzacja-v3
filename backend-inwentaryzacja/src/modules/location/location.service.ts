import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.to';
import { Location, LocationDocment } from './location.schema';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }


    async create(body: CreateLocationDto): Promise<Location> {
        const createdLocation = new this.locationModel(body);
        return createdLocation.save();

    }

    async find(query: string): Promise<Location[]> {
        return this.locationModel.find(JSON.parse(query)).exec();
    }

    async delete(id: string): Promise<string> {
        this.locationModel.deleteMany({ "_id": id }).exec();
        return "OK";
    }

    async update(id: string, body: UpdateLocationDto): Promise<string> {
        this.locationModel.updateMany({ "_id": id }, body).exec();
        return "OK";
    }
}

