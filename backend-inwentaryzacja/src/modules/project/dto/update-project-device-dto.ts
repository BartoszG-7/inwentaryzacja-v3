import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProjectDeviceDto {
    @IsString()
    @IsOptional()
    typeId?: Types.ObjectId;

    @IsNumber()
    @IsOptional()
    neededDevices?: number;
}