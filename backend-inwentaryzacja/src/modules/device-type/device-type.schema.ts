import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceTypeDocument = HydratedDocument<DeviceType>;

@Schema()
export class DeviceType {
    @Prop() ip: string;
    @Prop() deviceTypeTag: string;
    @Prop() tag: string;
    @Prop() macAddress: string;
    @Prop() serialNumber: string;
    @Prop() serverAddress: string;
    @Prop() note?: string;
    @Prop() pin?: string;
    @Prop() remoteAccessId: string;
}

export const deviceTypeSchema = SchemaFactory.createForClass(DeviceType);