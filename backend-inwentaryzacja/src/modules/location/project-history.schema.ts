import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type ProjectHistoryDocument = HydratedDocument<ProjectHistory>;

@Schema()
export class ProjectHistory {
    @Prop({ type: String }) type: string;

    @Prop({ type: Date }) date: Date;

    @Prop({ type: String }) tag: string;

    @Prop({ type: String }) deviceId: string;

}

export const ProjectHistorySchema = SchemaFactory.createForClass(ProjectHistory);