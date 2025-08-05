import { IsString, IsOptional } from 'class-validator';

export class CreateProjectHistoryDto {
    @IsString()
    ip: string;

    @IsString()
    ProjectHistoryTag: string;

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