import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceTypeDocument = HydratedDocument<DeviceType>;

@Schema()
export class DeviceType {
    @Prop() name: string;

    @Prop() tag: string;

    @Prop() maker: string;

    @Prop() model: string;

    @Prop() color: string;

    @Prop() remoteAccessEnum: string;

    @Prop() resolutionIfMonitor: string;

    @Prop() lastTag: string;

    
}

export const deviceTypeSchema = SchemaFactory.createForClass(DeviceType);