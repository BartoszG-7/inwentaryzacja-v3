import { IsString } from 'class-validator';

export class CreateDeviceTypeDto {
    @IsString()
    name: string;

    @IsString()
    tag: string;

    @IsString()
    note: string;

    @IsString()
    producent: string;

    @IsString()
    model: string;

    @IsString()
    resolution: string;

    @IsString()
    lastTag: string;

    @IsString()
    remote_access_enum: string;

    @IsString()
    color: string;
}