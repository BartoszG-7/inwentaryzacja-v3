import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
    @Prop() ip: string;
    @Prop() deviceTag: string;
    @Prop() tag: string;
    @Prop() macAddress: string;
    @Prop() serialNumber: string;
    @Prop() serverAddress: string;
    @Prop() note?: string;
    @Prop() pin?: string;
    @Prop() remoteAccessId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);