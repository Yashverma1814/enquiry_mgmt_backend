import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { EnquiryModule } from './enquiry/enquiry.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://yashm:Viratian@cluster0.g03cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    // AuthModule,
    EnquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
