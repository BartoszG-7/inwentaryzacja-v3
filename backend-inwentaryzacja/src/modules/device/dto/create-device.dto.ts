import { IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
    @IsString()
    ip: string;

    @IsString()
    deviceTag: string;

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