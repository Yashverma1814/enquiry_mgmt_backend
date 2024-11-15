import { Query } from '@nestjs/common';
// src/enquiry/schemas/enquiry.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EnquirySource {
  WEBSITE = 'website',
  SCHOOL_FAIR = 'school_fair    ',
  REFERRAL = 'referral',
  OTHER = 'other',
}

export enum Grade{
    PRE = "pre-nursery",
    NURSERY = "nursery",
    LKG = "LKG",
    UKG = "UKG",
    KG = "KG",
    GRADE_1 = "first class",
    GRADE_2 = "second class",
    GRADE_3 = "third class",
    GRADE_4 = "fourth class",
    GRADE_5 = "fifth class",
    GRADE_6 = "sixth class",
    GRADE_7 = "seventh class",
    GRADE_8 = "eighth class",
    GRADE_9 = "nineth class",
    GRADE_10 = "tenth class",
    GRADE_11 = "eleventh class",
    GRADE_12 = "twelfth class",
}

@Schema()
export class Enquiry extends Document {
  @Prop({ required: true })
  guardianName: string;

  @Prop({ required: true })
  relation: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ type:String, enum:Grade })
  grade?: string;

  @Prop({ required: true, type: Date })
  dateOfBirth: Date;

  @Prop()
  currentSchool?: string;


  @Prop({
    type: {
      contactMain: { type: String, required: true },
      contactOpt: { type: String },
      email: { type: String, required: true },
      socialMediaHandles: {
        twitter: { type: String },
      },
    },
    _id: false,
  })
  contactDetails: {
    contactMain: string;
    contactOpt?: string;
    email: string;
    socialMediaHandles?: {
      twitter?: String;
    };
  };

  @Prop({
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    _id: false,
  })
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Prop({ type: String, enum: EnquirySource }) 
  enquirySource?: EnquirySource

  @Prop({ type: String, default: '' })
  description?: string;

  @Prop({type:Boolean, default:false })
  wantHostelInfo?:Boolean

  @Prop({type:Boolean, default:false })
  wantTransportInfo?:Boolean

  @Prop({
    type: [
      {
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
        addedBy: { type: String, required: true },
      },
    ],
    default: [],
  })
  remark?: { message: string; date: Date; addedBy: string }[];
  

  @Prop({default:Date.now()})
  createdAt : Date
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
