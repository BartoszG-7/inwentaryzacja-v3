import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateProjectDeviceDto {
    @IsString()
    @IsNotEmpty()
    typeId: string;

    @IsNumber()
    @IsNotEmpty()
    neededDevices: number;
}
