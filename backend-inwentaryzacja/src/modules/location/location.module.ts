import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './location.schema';

import { ProjectService } from '../project/project.service';
import { ProjectController } from '../project/project.controller';
import { Project, ProjectSchema } from '../project/project.schema';
import { DeviceService } from '../device/device.service';
import { DeviceController } from '../device/device.controller';
import { Device, DeviceSchema } from '../device/device.schema';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja',), MongooseModule.forFeature([
        { name: Location.name, schema: LocationSchema }
    ]), MongooseModule.forFeature([
        { name: Project.name, schema: ProjectSchema }]), MongooseModule.forFeature([
            { name: Device.name, schema: DeviceSchema }]),],
    controllers: [LocationController, ProjectController, DeviceController],
    providers: [LocationService, ProjectService, DeviceService],
})
export class LocationModule { }
