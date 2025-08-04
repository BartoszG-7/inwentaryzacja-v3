import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.to';
import { Location, LocationDocment } from './location.schema';
@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }

    async create(createCatDto: CreateLocationDto): Promise<Location> {
        const createdLocation = new this.locationModel(CreateLocationDto);
        return createdLocation.save();
    }
    async createPost(body: JSON): Promise<Location> {
        const createdLocation = new this.locationModel(body);

        return createdLocation.save();
    }
    async findAll(): Promise<Location[]> {
        return this.locationModel.find({}).exec();
    }

}

