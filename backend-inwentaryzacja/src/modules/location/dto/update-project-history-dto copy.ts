import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProjectHistoryDto {
    @IsNumber()
    @IsOptional()
    type: number;

    @IsDateString()
    @IsOptional()
    date?: Date;

    @IsString()
    @IsOptional()
    tag?: string;

    @IsString()
    @IsOptional()
    deviceId?: string;
}