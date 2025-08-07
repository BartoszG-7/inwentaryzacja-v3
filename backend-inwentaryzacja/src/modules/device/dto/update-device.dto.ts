import { Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class UpdateDeviceDto {
    @IsOptional()
    @IsString()
    ip?: string;

    @IsOptional()
    @IsString()
    deviceTag?: string;

    @IsOptional()
    @IsString()
    tag?: string;

    @IsOptional()
    @IsString()
    macAddress?: string;

    @IsOptional()
    @IsString()
    serialNumber?: string;

    @IsOptional()
    @IsString()
    serverAddress?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    pin?: string;

    @IsOptional()
    @IsString()
    remoteAccessId?: string;

    @IsOptional()
    @Type(() => SchemaTypes.ObjectId)
    project: Types.ObjectId;
}