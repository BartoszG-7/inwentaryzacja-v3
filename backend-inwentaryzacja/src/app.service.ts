import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './modules/location/dto/create-location.to';

@Injectable()
export class AppService {
  constructor(@InjectModel(Location.name) private catModel: Model<Location>) { }

  async create(createCatDto: CreateLocationDto): Promise<Location> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Location[]> {
    return this.catModel.find({}).exec();
  }
  getHello(): any {
    return "Hello World!";
  }
}


