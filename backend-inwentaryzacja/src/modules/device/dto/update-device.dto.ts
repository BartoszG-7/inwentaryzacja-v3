import { Type } from 'class-transformer';
import { IsString, IsOptional, IsIP } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @Type(() => SchemaTypes.ObjectId)
  deviceType: Types.ObjectId;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  macAddress?: string;

  @IsOptional()
  @IsString()
  serialNr?: string;

  @IsOptional()
  @IsString()
  serverAddress?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  pin?: string;

  @IsOptional()
  @IsString()
  remoteAccessId?: string;

  @IsOptional()
  @Type(() => SchemaTypes.ObjectId)
  project: Types.ObjectId;

  @IsOptional()
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

  @IsString()
  @IsOptional()
  przesylkaNr: string;

  @IsString()
  @IsOptional()
  fakturaNr: string;
}
