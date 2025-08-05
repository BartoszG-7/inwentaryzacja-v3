import { IsArray, IsOptional, IsString } from "class-validator";
import { ProjectDevice } from "../project-device.schema";

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
    @IsString()
    networkAddress?: string;

    @IsOptional()
    @IsString()
    mask?: string;

    @IsOptional()
    @IsString()
    gateway?: string;

    @IsOptional()
    @IsString()
    addrPool?: string;

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
    // Optionally, add validation for ProjectDevice if you have a DTO for it
    projectDevices?: ProjectDevice[];
}