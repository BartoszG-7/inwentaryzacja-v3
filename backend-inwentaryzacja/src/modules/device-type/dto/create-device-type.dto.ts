import { IsString, IsOptional } from 'class-validator';

export class CreateDeviceTypeDto {
    @IsString()
    ip: string;

    @IsString()
    deviceTypeTag: string;

    @IsString()
    tag: string;

    @IsString()
    macAddress: string;

    @IsString()
    serialNumber: string;

    @IsString()
    serverAddress: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    pin?: string;

    @IsString()
    remoteAccessId: string;
}