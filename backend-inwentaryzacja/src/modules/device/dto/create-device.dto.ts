import { Type } from 'class-transformer';
import { IsString, IsOptional, IsIP } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class CreateDeviceDto {
  @IsOptional()
  @IsString()
  ip?: string;

  @Type(() => SchemaTypes.ObjectId)
  deviceType: Types.ObjectId; // DeviceType ObjectId

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  macAddr?: string;

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
  pinIfButton?: string;

  @IsOptional()
  @IsString()
  remoteAccessId?: string;

  @IsOptional()
  @Type(() => SchemaTypes.ObjectId)
  project: Types.ObjectId;

  @IsOptional()
  @IsString()
  wamaNr?: string;

  @IsOptional()
  @IsString()
  dns1?: string;

  @IsOptional()
  @IsString()
  dns2?: string;

  @IsOptional()
  @IsString()
  networkAddress?: string;

  @IsOptional()
  @IsString()
  mask?: string;

  @IsOptional()
  @IsString()
  gateway?: string;

  @IsOptional()
  @IsString()
  przesylkaNr?: string;

  @IsOptional()
  @IsString()
  fakturaNr?: string;
}
