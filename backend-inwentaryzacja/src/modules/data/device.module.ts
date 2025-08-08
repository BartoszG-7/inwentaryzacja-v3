import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from '../device/device.schema';

@Module({
    imports: [],
    controllers: [DataController],
    providers: [DataService],
})
export class deviceModule { }
