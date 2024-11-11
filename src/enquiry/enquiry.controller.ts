// src/enquiry/enquiry.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { Enquiry } from './schemas/enquiry.schema';

@Controller('enquiries')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  async createEnquiry(@Body() createEnquiryDto: any): Promise<Enquiry> {
    return this.enquiryService.createEnquiry(createEnquiryDto);
  }
  

  @Get()
  async getAllEnquiriesAndSort(@Query('sort') sortDirection: 'asc' | 'desc') {
    return this.enquiryService.findAll(sortDirection);
  }


  @Get()
  async getAllEnquiries(): Promise<Enquiry[]> {
    return this.enquiryService.getAllEnquiries();
  }

  @Get('filter-by-grade')
  async getEnquiriesByGrade(@Query('grade') grade: string) {
    return this.enquiryService.filterByGrade(grade);
  }

  @Get('filter-by-State')
  async getEnquiriesByState(@Query('state') state: string) {
    return this.enquiryService.filterByState(state);
  }

  @Get(':id')
  async getEnquiryById(@Param('id') id: string): Promise<Enquiry> {
    return this.enquiryService.getEnquiryById(id);
  }

  @Put(':id')
  async updateEnquiry(
    @Param('id') id: string,
    @Body() updateEnquiryDto: any,
  ): Promise<Enquiry> {
    return this.enquiryService.updateEnquiry(id, updateEnquiryDto);
  }

  @Delete(':id')
  async deleteEnquiry(@Param('id') id: string): Promise<Enquiry> {
    return this.enquiryService.deleteEnquiry(id);
  }
}
