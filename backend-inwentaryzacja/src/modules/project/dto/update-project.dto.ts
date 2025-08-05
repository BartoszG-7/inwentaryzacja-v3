import {
    IsArray,
    IsOptional,
    IsString,
    IsIP,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectDevice } from '../project-device.schema';
import { ProjectHistory } from '../project-history.schema';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    dns?: string;

    @IsOptional()
    @IsIP()
    networkAddress?: string;

    @IsOptional()
    @IsIP()
    mask?: string;

    @IsOptional()
    @IsIP()
    gateway?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    addrPool?: string[];

    @IsOptional()
    @IsString()
    addrExclude?: string;

    @IsOptional()
    @IsString()
    remoteAccessTag?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    devices?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectDevice)
    projectDevices?: ProjectDevice[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectHistory)
    projectHistory?: ProjectHistory[];
}