import {
    IsArray,
    IsOptional,
    IsString,
    ValidateNested,
    IsIP,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProjectHistoryDto } from './update-project-history-dto copy';
import { UpdateProjectDeviceDto } from './update-project-device-dto';

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @IsIP()
    dns?: string;

    @IsString()
    @IsOptional()
    @IsIP()
    networkIp?: string;

    @IsString()
    @IsOptional()
    @IsIP()
    mask?: string;

    @IsString()
    @IsOptional()
    @IsIP()
    gateway?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    addrPool?: string[];

    @IsString()
    @IsOptional()
    addrExclude?: string;

    @IsString()
    @IsOptional()
    remoteAccessTag?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => UpdateProjectDeviceDto)
    projectDevices?: UpdateProjectDeviceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => UpdateProjectHistoryDto)
    projectHistory?: UpdateProjectHistoryDto[];
}