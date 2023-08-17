import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileUploadService } from 'src/services/fileupload.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    envFilePath : `.env`
  })],
  controllers: [FileuploadController],
  providers : [FileUploadService]
})
export class FileuploadModule {}
