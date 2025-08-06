import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';


export class CreateProjectDeviceDto {
    @IsString()
    @IsNotEmpty()
    typeId: string;

    @IsNumber()

    neededDevices: number;
}
