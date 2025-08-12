import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsIP,
} from 'class-validator';
import { CreateProjectDto } from '../../project/dto/create-project.dto';

import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  tag: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  note: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects: CreateProjectDto[];
}
