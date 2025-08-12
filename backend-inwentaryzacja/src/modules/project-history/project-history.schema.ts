import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { ObjectId, HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
export type ProjectHistoryDocument = HydratedDocument<ProjectHistory>;

@Schema()
export class ProjectHistory {
  @Prop({ type: Number }) type: number;

  @Prop({ type: Date }) date: Date;

  @Prop({ type: String }) tag: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Device' }) deviceId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' }) project: ObjectId;
}

export const ProjectHistorySchema =
  SchemaFactory.createForClass(ProjectHistory);
