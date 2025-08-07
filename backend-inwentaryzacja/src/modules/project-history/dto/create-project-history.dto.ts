import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import type {ObjectId} from 'mongoose';
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
    
    @IsOptional()
    @Type(() => SchemaTypes.ObjectId)
    project: ObjectId;
}