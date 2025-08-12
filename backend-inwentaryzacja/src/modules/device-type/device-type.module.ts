import { Module } from '@nestjs/common';
import { DeviceTypeController } from './device-type.controller';
import { DeviceTypeService } from './device-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceType, deviceTypeSchema } from './device-type.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja'),
    MongooseModule.forFeature([
      { name: DeviceType.name, schema: deviceTypeSchema },
    ]),
  ],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
})
export class deviceTypeModule {}
