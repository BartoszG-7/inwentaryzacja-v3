import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProjectDeviceDocment = HydratedDocument<ProjectDevice>;

@Schema()
export class ProjectDevice {
    @Prop({ type: String }) typeId: string;
    @Prop({ type: Number }) neededDevices: number;

}

export const ProjectDeviceSchema = SchemaFactory.createForClass(ProjectDevice);
