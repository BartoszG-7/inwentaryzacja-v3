import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type LocationDocment = HydratedDocument<Location>;

@Schema()
export class Location {
    @Prop() name: string;

    @Prop({ type: String })
    tag: string;

    @Prop()
    address: string;

    @Prop()
    note: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
    projects: Types.ObjectId[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);