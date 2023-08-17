import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileuploadModule } from './modules/fileupload/fileupload.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot({
    isGlobal:true,
    envFilePath : `.env`
  }),
  
  FileuploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
