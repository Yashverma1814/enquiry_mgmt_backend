// src/enquiry/enquiry.service.ts
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Enquiry } from "./schemas/enquiry.schema";

@Injectable()
export class EnquiryService {
  constructor(@InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>) {}

  async isContactMainRegistered(contactMain:string): Promise<boolean>{
    const existingEnquery = await this.enquiryModel.findOne({"contactDetails.contactMain":contactMain}).exec()
    return !!existingEnquery
  }

  async createEnquiry(createEnquiryDto: any): Promise<Enquiry> {

    const {contactMain} = createEnquiryDto.contactDetails

    const phoneNumberExist =  await this.isContactMainRegistered(contactMain)

    if(phoneNumberExist){
        throw new ConflictException("Enquiry is already Registered with this Phone Number ")
    }

    const newEnquiry = new this.enquiryModel(createEnquiryDto);
    return newEnquiry.save();
  }

  async getAllEnquiries(): Promise<Enquiry[]> {
    return this.enquiryModel.find().exec();
  }

  async getEnquiryById(id: string): Promise<Enquiry> {
    return this.enquiryModel.findById(id).exec();
  }

  async updateEnquiry(id: string, updateEnquiryDto: any): Promise<Enquiry> {
    return this.enquiryModel.findByIdAndUpdate(id, updateEnquiryDto, { new: true }).exec();
  }

  async deleteEnquiry(id: string): Promise<Enquiry> {
    return this.enquiryModel.findByIdAndDelete(id).exec();
  }

  async filterByGrade(grade: string) {
    return this.enquiryModel.find({ grade }).exec();
  }

  async filterByState(state:string){
    return this.enquiryModel.find({'address.state':state}).exec();
  }

  async findAll(sortDirection: 'asc' | 'desc' = 'asc') {
    return this.enquiryModel.find().sort({ createdAt: sortDirection === 'asc' ? 1 : -1 }).exec();
  }
  
  

}
