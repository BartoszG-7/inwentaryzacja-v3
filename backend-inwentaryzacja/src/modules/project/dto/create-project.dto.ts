import { IsString } from 'class-validator';

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
}