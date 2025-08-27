import {
  IsArray,
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsIP,
  ArrayNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateProjectHistoryDto } from '../../project-history/dto/create-project-history.dto';
import { CreateProjectDeviceDto } from './create-project-device-dto';
import { SchemaTypeOptions, SchemaTypes } from 'mongoose';
import type { ObjectId } from 'mongoose';
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIP()
  dns1: string;

  @IsString()
  @IsNotEmpty()
  @IsIP()
  dns2: string;

  @IsString()
  @IsNotEmpty()
  @IsIP()
  networkAddress: string;

  @IsString()
  @IsNotEmpty()
  @IsIP()
  mask: string;

  @IsString()
  @IsNotEmpty()
  @IsIP()
  gateway: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  addrPool: string[];

  @IsString()
  @IsOptional()
  addrExclude?: string;

  @IsString()
  @IsNotEmpty()
  remoteAccessTag: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDeviceDto)
  projectDevices?: CreateProjectDeviceDto[];

  @Type(() => SchemaTypes.ObjectId)
  location: ObjectId;

  @IsString()
  @IsOptional()
  lastIp?: string;
}
