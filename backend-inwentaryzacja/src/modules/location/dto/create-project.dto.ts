import {
    IsArray,
    IsOptional,
    IsString,
    IsNotEmpty,
    ValidateNested,
    IsIP,
    ArrayNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateProjectHistoryDto } from './create-project-history-dto';
import { CreateProjectDeviceDto } from './create-project-device-dto';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsIP()
    dns: string;

    @IsString()
    @IsNotEmpty()
    @IsIP()
    networkIp: string;

    @IsString()
    @IsNotEmpty()
    @IsIP()
    mask: string;

    @IsString()
    @IsNotEmpty()
    @IsIP()
    gateway: string;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    addrPool: string[];

    @IsString()
    @IsOptional()
    addrExclude?: string;

    @IsString()
    @IsNotEmpty()
    remoteAccessTag: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProjectDeviceDto)
    projectDevices?: CreateProjectDeviceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayNotEmpty()
    @Type(() => CreateProjectHistoryDto)
    projectHistory: CreateProjectHistoryDto[];

}