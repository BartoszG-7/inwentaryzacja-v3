import { Type } from 'class-transformer';
import { IsString, IsOptional, IsIP } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class CreateDeviceDto {
  @IsString()
  ip: string;

  @IsString()
  deviceType: string; // DeviceType ObjectId

  @IsString()
  tag: string;

  @IsString()
  macAddr: string;

  @IsString()
  serialNr: string;

  @IsString()
  serverAddress: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  pinIfButton?: string;

  @IsString()
  remoteAccessId: string;

  @IsOptional()
  @Type(() => SchemaTypes.ObjectId)
  project: Types.ObjectId;

  @IsString()
  wamaNr: string;

  @IsString()
  @IsOptional()
  @IsIP()
  dns1?: string;

  @IsString()
  @IsOptional()
  @IsIP()
  dns2?: string;

  @IsString()
  @IsOptional()
  @IsIP()
  networkAddress?: string;

  @IsString()
  @IsOptional()
  @IsIP()
  mask?: string;

  @IsString()
  @IsOptional()
  @IsIP()
  gateway?: string;
}
