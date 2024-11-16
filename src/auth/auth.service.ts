
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import {  User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && bcrypt.compareSync(pass, user.password)) { 
      return { username: user.username, role: user.role };
    }
    return null;
  }
  async login(user: any) {
    const payload: JwtPayload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      username:user.username
    };
  }
  
  async register(username:string,password:string,role = 'user'): Promise<any> {
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new this.userModel({username,password:hashedPassword,role});
    newUser.save()
  }
}
