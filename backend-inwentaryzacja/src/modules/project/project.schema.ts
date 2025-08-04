import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProjectDocment = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop() name: string;
    @Prop() notes: string;
    @Prop() dns: string;
    @Prop() networkAddress: string;
    @Prop() mask: string;
    @Prop() gateway: string;
    @Prop() addrPool: string;
    @Prop() addrExclude: string;
    @Prop() remoteAccessTag: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
