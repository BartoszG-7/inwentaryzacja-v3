import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectDevice } from './project-device.schema';
import { ProjectHistory } from './project-history.schema';
export type ProjectDocment = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop() name: string;

    @Prop() dns: string;

    @Prop() networkAddress: string;

    @Prop() mask: string;

    @Prop() gateway: string;

    @Prop({ type: [String] }) addrPool: string[];

    @Prop() addrExclude: string;

    @Prop() remoteAccessTag: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }] })
    devices: Types.ObjectId[];

    @Prop({ type: [ProjectDevice] }) projectDevices: ProjectDevice[];
    @Prop({ type: [ProjectHistory] }) projectHistory: ProjectHistory[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
