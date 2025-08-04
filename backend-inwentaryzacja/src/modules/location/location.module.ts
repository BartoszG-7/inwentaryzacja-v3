import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './location.schema';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja',), MongooseModule.forFeature([
        { name: Location.name, schema: LocationSchema }
    ]),],
    controllers: [LocationController],
    providers: [LocationService],
})
export class LocationModule { }
