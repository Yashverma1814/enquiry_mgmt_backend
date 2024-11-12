import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        uri:`mongodb+srv://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@cluster0.g03cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      }),
    }),
    // AuthModule,
    EnquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
