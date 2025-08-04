import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    tag: string;

    @IsString()
    note: string;
}