import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    name: string;

    @IsString()
    address: string;


    @IsString({ each: true })
    tag: string;

    @IsString()
    note: string;
}