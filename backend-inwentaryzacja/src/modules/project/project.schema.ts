import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProjectDevice } from './project-device.schema';
import { ProjectHistory } from './project-history.schema';
export type ProjectDocment = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop() name: string;

    @Prop() notes: string;

    @Prop() dns: string;

    @Prop() networkAddress: string;

    @Prop() mask: string;

    @Prop() gateway: string;

    @Prop() addrPool: string[];

    @Prop() addrExclude: string;

    @Prop() remoteAccessTag: string;

    @Prop() devices: string[];
     // Assuming devices is an array of strings, adjust as necessary
    @Prop() projectDevices: ProjectDevice[]; // Assuming projectDevices is an array of ProjectDevice documents

    @Prop() projectHistory: ProjectHistory[]; // Assuming projectHistory is an array of ProjectHistory documents
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
