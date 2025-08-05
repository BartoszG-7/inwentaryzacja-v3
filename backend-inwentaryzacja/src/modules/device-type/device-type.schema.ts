import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceTypeDocument = HydratedDocument<DeviceType>;

@Schema()
export class DeviceType {
    @Prop() name: string;
    @Prop() tag: string;
    @Prop() note: string;
    @Prop() producent: string;
    @Prop() model: string;
    @Prop() resolution: string;
    @Prop() last_tag: string;
    @Prop() remote_access_enum: string;
    @Prop() color: string;
}

export const deviceTypeSchema = SchemaFactory.createForClass(DeviceType);