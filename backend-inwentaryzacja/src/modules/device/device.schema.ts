import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes, Types } from 'mongoose';
export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop() ip: string;

  @Prop({ type: Types.ObjectId, ref: 'DeviceType' })
  deviceType: Types.ObjectId;

  @Prop() tag: string;

  @Prop() macAddr: string;

  @Prop() serialNr: string;

  @Prop() serverAddress: string;

  @Prop() note: string;

  @Prop() pinIfButton?: string;

  @Prop() remoteAccessId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' }) project: Types.ObjectId;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
