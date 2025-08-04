import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type LocationDocment = HydratedDocument<Location>;

@Schema()
export class Location {

    @Prop()
    name: string;

    @Prop()
    address: string;
    @Prop()
    tags: string[];
    @Prop()
    note: string;
}
/*  @Prop()
  projects: Array<{
      name: string;
      notes: string;
      dns: string;
      networkAddress: string;
      mask: string;
      gateway: string;
      addrPool: string;
      addrExclude: string;
      remoteAccessTag: string;
      devices: Array<{
          ip: string;
          deviceTag: string;
          tags: string[];
          macAddress: string;
          serialNumber: string;
          serverAddress: string;
          note?: string;
          pin?: string;
          remoteAccessId: string;
      }>;
  }>;*/

export const LocationSchema = SchemaFactory.createForClass(Location);