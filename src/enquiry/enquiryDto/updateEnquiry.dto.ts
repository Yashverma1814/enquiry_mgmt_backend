// src/enquiry/dto/update-enquiry.dto.ts
import { IsString, IsOptional, IsEnum, IsDate, IsObject, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EnquirySource, Grade } from '../schemas/enquiry.schema';

export class UpdateEnquiryDto {
  @IsString()
  @IsOptional()
  guardianName?: string;

  @IsString()
  @IsOptional()
  relation?: string;

  @IsString()
  @IsOptional()
  studentName?: string;

  @IsEnum(Grade)
  @IsOptional()
  grade?: Grade;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  currentSchool?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ContactDetailsDto)
  @IsOptional()
  contactDetails?: ContactDetailsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @IsEnum(EnquirySource)
  @IsOptional()
  enquirySource?: EnquirySource;

  @IsString()
  @IsOptional()
  description?: string;
}

class ContactDetailsDto {
  @IsString()
  @IsOptional()
  contactMain?: string;

  @IsString()
  @IsOptional()
  contactOpt?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsObject()
  @IsOptional()
  socialMediaHandles?: {
    twitter?: string;
  };
}

class AddressDto {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  country?: string;
}
