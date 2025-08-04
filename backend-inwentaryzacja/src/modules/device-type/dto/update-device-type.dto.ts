import { IsString, IsOptional } from 'class-validator';

export class UpdateDeviceTypeDto {
    @IsOptional()
    @IsString()
    ip?: string;

    @IsOptional()
    @IsString()
    deviceTypeTag?: string;

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
}