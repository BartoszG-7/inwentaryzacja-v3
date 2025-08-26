import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.to';
import { Location, LocationDocment } from './location.schema';
import { UpdateLocationDto } from './dto/update-location.dto';
export type address = {
  city: string;
  street: string;
  street_num: number;
  apartament_num?: number;
  post_code: string;
};
@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async create(body: CreateLocationDto): Promise<Location> {
    const bodyTemp = body;
    console.log(bodyTemp);
    bodyTemp.address = JSON.stringify(this.stringToAddr(body.address));
    const createdLocation = new this.locationModel(body);
    return createdLocation.save();
  }

  async find(query: string): Promise<Location[]> {
    let tempRes: any;
    if (query === 'treebar') {
      tempRes = await this.locationModel.find().select('name').exec();
    } else {
      tempRes = await this.locationModel.find(JSON.parse(query)).exec();
    }
    console.log(tempRes);
    let finalRes: any = [];
    tempRes.forEach((element) => {
      let tempEl = JSON.parse(JSON.stringify(element));
      tempEl.address = this.addrToString(element.address);
      console.log('TOSTRING', tempEl);
      finalRes.push({ ...tempEl });
    });
    console.log(finalRes);
    return finalRes;
  }
  async delete(id: string): Promise<string> {
    await this.locationModel.deleteOne({ _id: id }).exec();
    return 'OK';
  }

  async update(id: string, body: UpdateLocationDto): Promise<any> {
    return await this.locationModel.updateOne({ _id: id }, body).exec();
  }
  async deleteMany(filter: any): Promise<string> {
    await this.locationModel.deleteMany(filter).exec();
    return 'OK';
  }

  async updateMany(filter: any, body: UpdateLocationDto): Promise<string> {
    await this.locationModel.updateMany(filter, body).exec();
    return 'OK';
  }
  addrToString(addre: string) {
    console.log(addre);
    // const addr: address = JSON.parse(
    //   await this.locationModel
    //     .find({ _id: new Types.ObjectId(id) })
    //     .select('address')
    //     .exec()[0].address,
    // );
    const addr: address = JSON.parse(addre);
    if (addr.apartament_num) {
      return (
        addr.city +
        ',' +
        addr.street +
        ',' +
        addr.street_num.toString() +
        ',' +
        addr.apartament_num.toString() +
        ',' +
        addr.post_code
      );
    } else {
      return (
        addr.city +
        ',' +
        addr.street +
        ',' +
        addr.street_num.toString() +
        ',' +
        addr.post_code
      );
    }
  }
  stringToAddr(addrStr: string) {
    const addrArr = addrStr.split(',');

    if (addrArr.length === 5) {
      const addr: address = {
        city: addrArr[0],
        street: addrArr[1],
        street_num: Number(addrArr[2]),
        apartament_num: Number(addrArr[3]),
        post_code: addrArr[4],
      };
      console.log(addr);
      return addr;
    } else {
      const addr: address = {
        city: addrArr[0],
        street: addrArr[1],
        street_num: Number(addrArr[2]),
        post_code: addrArr[3],
      };
      console.log(addr);
      return addr;
    }
  }
}
