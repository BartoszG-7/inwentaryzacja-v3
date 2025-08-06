import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectDeviceDto {
    @IsString()
    @IsOptional()
    typeId?: string;

    @IsNumber()
    @IsOptional()
    neededDevices?: number;
}