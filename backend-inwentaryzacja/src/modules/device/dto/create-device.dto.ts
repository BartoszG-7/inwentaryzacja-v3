import { Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class CreateDeviceDto {
    @IsString()
    ip: string;

    @IsString()
    deviceType: string; // DeviceType ObjectId

    @IsString()
    tag: string;

    @IsString()
    macAddr: string;

    @IsString()
    serialNr: string;

    @IsString()
    serverAddress: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    pinIfButton?: string;

    @IsString()
    remoteAccessId: string;

    @IsOptional()
    @Type(() => SchemaTypes.ObjectId)
    project: Types.ObjectId;
}