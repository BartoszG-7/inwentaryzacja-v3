import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    tag: string[];

    @IsString()
    address: string;

    @IsString()
    note: string;

    @IsOptional()
    @IsArray()
    projects?: string[]; // Array of Project ObjectIds
}