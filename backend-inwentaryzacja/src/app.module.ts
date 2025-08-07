import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './modules/location/location.service';
import { ProjectService } from './modules/project/project.service';
import { DeviceService } from './modules/device/device.service';
import { LocationController } from './modules/location/location.controller';
import { ProjectController } from './modules/project/project.controller';
import { DeviceController } from './modules/device/device.controller';
import { Location, LocationSchema } from './modules/location/location.schema';
import { Project, ProjectSchema } from './modules/project/project.schema';
import { Device, DeviceSchema } from './modules/device/device.schema';
import { ProjectHistory, ProjectHistorySchema } from './modules/project-history/project-history.schema';
import { ProjectHistoryService } from './modules/project-history/project-history.service';
import { ProjectHistoryController } from './modules/project-history/project-history.controller';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja',), MongooseModule.forFeature([
    { name: Location.name, schema: LocationSchema }
  ]), MongooseModule.forFeature([
    { name: Project.name, schema: ProjectSchema }]), MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema }]), MongooseModule.forFeature([
        { name: ProjectHistory.name, schema: ProjectHistorySchema }]),],
  controllers: [LocationController, ProjectController, DeviceController, ProjectHistoryController],
  providers: [LocationService, ProjectService, DeviceService, ProjectHistoryService],
})
export class AppModule { }
