import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateLocationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    tag?: string;

    @IsOptional()
    @IsString()
    note?: string;
}