import { IsString, IsOptional } from 'class-validator';

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
}