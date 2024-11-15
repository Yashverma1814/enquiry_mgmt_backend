import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class RemarkItemDto {
    @IsString()
    @IsNotEmpty()
    message: string;
  
  
    @IsString()
    @IsNotEmpty()
    addedBy: string;
  }
  
  export class RemarkDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RemarkItemDto)
    @IsOptional()
    remark?: RemarkItemDto[];
  }
  