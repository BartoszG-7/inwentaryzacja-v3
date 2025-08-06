import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class UpdateProjectHistoryDto {
    @IsString()
    @IsOptional()
    type?: string;

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