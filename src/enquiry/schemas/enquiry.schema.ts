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
    GRADE_1 = "Play School",
    GRADE_2 = "pre-nursery",
    GRADE_3 = "nursery",
    GRADE_4 = "LKG",
    GRADE_5 = "UKG",
    GRADE_6 = "KG",
    GRADE_7 = "first class",
    GRADE_8 = "second class",
    GRADE_9 = "third class",
    GRADE_10 = "fourth class",
    GRADE_11 = "fifth class",
    GRADE_12 = "sixth class",
    GRADE_13 = "seventh class",
    GRADE_14 = "eighth class",
    GRADE_15 = "nineth class",
    GRADE_16 = "tenth class",
    GRADE_17 = "eleventh class",
    GRADE_18 = "twelfth class",
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

  @Prop({default:Date.now()})
  createdAt : Date
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
