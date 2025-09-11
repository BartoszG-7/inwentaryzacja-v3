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

      finalRes.push({ ...tempEl });
    });

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
    let addr: address;
    try {
      addr = JSON.parse(addre);
    } catch (e) {
      // fallback to empty address if parsing fails
  addr = { city: '', street: '', street_num: 0, post_code: '' };
    }
    const city = addr.city ?? '';
    const street = addr.street ?? '';
    const street_num = addr.street_num != null ? addr.street_num.toString() : '';
    const apartament_num = addr.apartament_num != null ? addr.apartament_num.toString() : '';
    const post_code = addr.post_code ?? '';
    if (apartament_num) {
      return `${city},${street},${street_num},${apartament_num},${post_code}`;
    } else {
      return `${city},${street},${street_num},${post_code}`;
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
