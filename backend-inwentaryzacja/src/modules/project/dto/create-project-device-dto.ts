import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDeviceDto {
  @IsString()
  @IsNotEmpty()
  typeId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  neededDevices: number;
}
