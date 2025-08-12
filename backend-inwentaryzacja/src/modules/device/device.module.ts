import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja'),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class deviceModule {}
