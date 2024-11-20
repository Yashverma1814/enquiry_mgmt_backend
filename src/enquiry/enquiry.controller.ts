
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
import { RemarkDto } from './enquiryDto/addRemark.dto';

@Controller('enquiries')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  async createEnquiry(@Body() createEnquiryDto: any): Promise<Enquiry> {
    return this.enquiryService.createEnquiry(createEnquiryDto);
  }

  @Get()
  async getAllEnquiries(): Promise<Enquiry[]> {
    return this.enquiryService.getAllEnquiries();
  }

  
  @Get('sorting')
  async getAllEnquiriesAndSort(@Query('sort') sortDirection: 'asc' | 'desc') {
    return this.enquiryService.findAll(sortDirection);
  }


  @Get('paginate')
  async findAll(
    @Query('limit') limit: number = 10, 
    @Query('page') page: number = 1,
    @Query('state') state:string = "",
    @Query('enquirySource') enquirySource:string = "", 
    @Query('hostel') hostel :boolean = null,
    @Query('searchedName') searchedName:string = ""
  ) {
    return this.enquiryService.paginateEnquiries(limit, page,state,enquirySource,searchedName );
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

  @Put('add-remark/:id')
  async addRemark(
    @Param('id') id:string,
    @Body() RemarkDto:any
  ):Promise<{ message: any; date: Date; addedBy: any; }>{
    return this.enquiryService.addRemark(id,RemarkDto)
  }
  
}
