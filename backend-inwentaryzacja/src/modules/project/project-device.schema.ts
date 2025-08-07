import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
export type ProjectDeviceDocment = HydratedDocument<ProjectDevice>;

@Schema()
export class ProjectDevice {
    @Prop({ type: SchemaTypes.ObjectId }) typeId: Types.ObjectId;
    @Prop({ type: Number }) neededDevices: number;

}

export const ProjectDeviceSchema = SchemaFactory.createForClass(ProjectDevice);
