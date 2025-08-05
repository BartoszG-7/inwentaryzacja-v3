import {
    IsArray,
    IsOptional,
    IsString,
    IsNotEmpty,
    ArrayNotEmpty,
} from 'class-validator';

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

    @IsString()
    @IsOptional()
    location?: string; // Location ObjectId
}