import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProjectDeviceDto {
    @IsString()
    @IsOptional()
    typeId?: string;

    @IsNumber()
    @IsOptional()
    neededDevices?: number;
}