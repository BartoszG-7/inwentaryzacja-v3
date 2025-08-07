import { Type } from 'class-transformer';
import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import type { ObjectId } from 'mongoose';
import { ref } from 'process';
import { from } from 'rxjs';

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

    @Type(() => SchemaTypes.ObjectId)
    project: ObjectId;
}