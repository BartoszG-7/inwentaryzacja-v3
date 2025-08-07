import { Module } from '@nestjs/common';
import { ProjectHistoryController } from './project-history.controller';
import { ProjectHistoryService } from './project-history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectHistory, ProjectHistorySchema } from './project-history.schema';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/inwentaryzacja',), MongooseModule.forFeature([
        { name: ProjectHistory.name, schema: ProjectHistorySchema }
    ]),],
    controllers: [ProjectHistoryController],
    providers: [ProjectHistoryService],
})
export class ProjectHistoryModule { }
