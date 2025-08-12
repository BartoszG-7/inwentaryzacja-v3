import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsIP,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProjectDto } from '../../project/dto/update-project.dto';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsString()
  @IsOptional()
  @IsIP()
  address?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateProjectDto)
  projects?: UpdateProjectDto[];
}
