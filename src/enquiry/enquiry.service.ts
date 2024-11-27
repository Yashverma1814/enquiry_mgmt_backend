import { RemarkDto } from './enquiryDto/addRemark.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry } from './schemas/enquiry.schema';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>,
  ) {}

  async isContactMainRegistered(contactMain: string): Promise<boolean> {
    const existingEnquery = await this.enquiryModel
      .findOne({ 'contactDetails.contactMain': contactMain })
      .exec();
    return !!existingEnquery;
  }

  async createEnquiry(createEnquiryDto: any): Promise<Enquiry> {
    const { contactMain } = createEnquiryDto.contactDetails;

    const phoneNumberExist = await this.isContactMainRegistered(contactMain);

    if (phoneNumberExist) {
      throw new ConflictException(
        'Enquiry is already Registered with this Phone Number ',
      );
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
    return this.enquiryModel
      .findByIdAndUpdate(id, updateEnquiryDto, { new: true })
      .exec();
  }

  async addRemark(id: string, RemarkDto) {
    const enquiry = await this.enquiryModel.findById(id);
    if (!enquiry) {
      throw new NotFoundException('Enquiry not found');
    }

    const remark = {
      message: RemarkDto.message,
      date: new Date(),
      addedBy: RemarkDto.addedBy,
    };

    enquiry.remark.push(remark);
    await enquiry.save();

    return remark;
  }

  async deleteEnquiry(id: string): Promise<Enquiry> {
    return this.enquiryModel.findByIdAndDelete(id).exec();
  }

  async filterByGrade(grade: string) {
    return this.enquiryModel.find({ grade }).exec();
  }

  async filterByState(state: string) {
    return this.enquiryModel.find({ 'address.state': state }).exec();
  }

  async findAll(sortDirection: 'asc' | 'desc' = 'asc') {
    return this.enquiryModel
      .find()
      .sort({ createdAt: sortDirection === 'asc' ? 1 : -1 })
      .exec();
  }

  async paginateEnquiries(
    limit: number = 10,
    page: number = 1,
    state: string = '',
    enquirySource: string = '',
    searchedName: string = '',
    sort: string = '',
    nameSort: string = '',
  ) {
    const offset = (page - 1) * limit;

    const query: any = {};

    if (state) {
      query['address.state'] = state;
    }

    if (enquirySource) {
      query['enquirySource'] = enquirySource;
    }

    if (searchedName) {
      query['studentName'] = new RegExp(searchedName, 'i');
    }

    const sortQuery: any = {};
    
    if (sort) {
      sortQuery['createdAt'] = sort === 'asc' ? 1 : -1;
    }
    if (nameSort) {
      sortQuery['studentName'] = nameSort === 'asc' ? 1 : -1;
    }

    const enquiries = await this.enquiryModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery);

    const total = await this.enquiryModel.countDocuments(query);

    return {
      enquiries,
      total,
      limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
    };
  }
}
