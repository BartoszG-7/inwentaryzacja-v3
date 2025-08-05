import { IsString, IsOptional } from 'class-validator';

export class UpdateDeviceTypeDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    tag?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    producent?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    resolution?: string;

    @IsOptional()
    @IsString()
    lastTag?: string;

    @IsOptional()
    @IsString()
    remote_access_enum?: string;

    @IsOptional()
    @IsString()
    color?: string;
}