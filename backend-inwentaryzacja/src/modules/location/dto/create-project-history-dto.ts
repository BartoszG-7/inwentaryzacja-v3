import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectHistoryDto {
    @IsNumber()
    @IsNotEmpty()
    type: number;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsOptional()
    tag?: string;

    @IsString()
    @IsOptional()
    deviceId?: string;
}