import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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

    @Prop({ type: [Project] })
    projects: Project[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);