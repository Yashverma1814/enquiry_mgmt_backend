// src/enquiry/dto/create-enquiry.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum, IsDate, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EnquirySource, Grade } from '../schemas/enquiry.schema';

export class CreateEnquiryDto {
  @IsString()
  @IsNotEmpty()
  guardianName: string;

  @IsString()
  @IsNotEmpty()
  relation: string;

  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsEnum(Grade)
  @IsOptional()
  grade?: Grade;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  currentSchool?: string;
  
  @IsOptional()
  wantHostel?:Boolean

  @IsOptional()
  wantTransport?:Boolean

  @IsObject()
  @ValidateNested()
  @Type(() => ContactDetailsDto)
  contactDetails: ContactDetailsDto;

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
  @IsNotEmpty()
  contactMain: string;

  @IsString()
  @IsOptional()
  contactOpt?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
