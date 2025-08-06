import {
    IsArray,
    IsOptional,
    IsString,
    IsNotEmpty,
    ArrayNotEmpty,
    ValidateNested,
} from 'class-validator';
import { ProjectHistory } from '../project-history.schema';
import { ProjectDevice } from '../project-device.schema';
import { Type } from 'class-transformer';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    dns?: string;

    @IsString()
    @IsOptional()
    networkIp?: string;

    @IsString()
    @IsOptional()
    mask?: string;

    @IsString()
    @IsOptional()
    gateway?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    addrPool?: string[];

    @IsString()
    @IsOptional()
    addrExclude?: string;

    @IsString()
    @IsOptional()
    remoteAccessTag?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    devices?: string[]; // Array of Device ObjectIds
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectDevice)
    projectDevices?: ProjectDevice[];


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectHistory)
    projectHistory: ProjectHistory[];

}