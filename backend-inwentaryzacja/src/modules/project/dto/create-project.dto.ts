import {
  IsArray,
  IsOptional,
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsIP,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  dns: string;

  @IsIP()
  networkAddress: string;

  @IsIP()
  mask: string;

  @IsIP()
  gateway: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  addrPool: string[];

  @IsString()
  @IsOptional()
  addrExclude?: string;

  @IsString()
  @IsOptional()
  remoteAccessTag?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  devices?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projectDevices?: string[]; // Use sub-DTOs if you want nested validation

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projectHistory: string[];
}