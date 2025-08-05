import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProjectHistoryDocument = HydratedDocument<ProjectHistory>;

@Schema()
export class ProjectHistory {
    @Prop() ip: string;
    @Prop() ProjectHistoryTag: string;
    @Prop() tag: string;
    @Prop() macAddress: string;
    @Prop() serialNumber: string;
    @Prop() serverAddress: string;
    @Prop() note?: string;
    @Prop() pin?: string;
    @Prop() remoteAccessId: string;
}

export const ProjectHistorySchema = SchemaFactory.createForClass(ProjectHistory);