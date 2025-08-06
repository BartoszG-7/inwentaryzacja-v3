import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateProjectHistoryDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    tag: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;
}