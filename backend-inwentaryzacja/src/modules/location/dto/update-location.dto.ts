import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateLocationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tag?: string;

    @IsOptional()
    @IsString()
    note?: string;
}