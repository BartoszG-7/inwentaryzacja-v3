import { IsString } from 'class-validator';

export class CreateDeviceTypeDto {
    @IsString()
    name: string;

    @IsString()
    tag: string;

    @IsString()
    maker: string;

    @IsString()
    model: string;

    @IsString()
    color: string;

    @IsString()
    remoteAccessEnum: string;

    @IsString()
    resolutionIfMonitor: string;

    @IsString()
    lastTag: string;
}