import { IsString, IsOptional, IsArray } from 'class-validator';
import { ProjectDevice } from '../project-device.schema';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    notes: string;

    @IsString()
    dns: string;

    @IsString()
    networkAddress: string;

    @IsString()
    mask: string;

    @IsString()
    gateway: string;

    @IsString()
    addrPool: string;

    @IsString()
    addrExclude: string;

    @IsString()
    remoteAccessTag: string;

    @IsArray()
    @IsString({ each: true })
    devices: string[];

    @IsArray()
    // Optionally, add validation for ProjectDevice if you have a DTO for it
    projectDevices: ProjectDevice[];
}
