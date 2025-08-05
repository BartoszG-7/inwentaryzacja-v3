import {
    IsArray,
    IsOptional,
    IsString,
    IsNotEmpty,
    ArrayNotEmpty,
    IsIP,
} from 'class-validator';

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
    @IsString({ each: true })
    projectDevices?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    projectHistory?: string[];
}