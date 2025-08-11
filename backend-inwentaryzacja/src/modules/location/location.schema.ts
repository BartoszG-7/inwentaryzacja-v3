import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaType, SchemaTypes, Types } from 'mongoose';
import { Project } from '../project/project.schema';
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

}

export const LocationSchema = SchemaFactory.createForClass(Location);