import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { File } from 'buffer';
import { Path } from '@nestjs/config';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { IFileUpload } from 'src/interfaces/FileUpload.interface';
import { IMultipleFileUpload } from 'src/interfaces/MultipleFileUpload.interface';
var path = require('path');

@Controller('api/fileupload')
export class FileuploadController {
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './client',
        filename: (req, file, callback) => {
          return callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format : 'binary'
        },
      },
    },
  })
  @ApiOkResponse({
    type: IFileUpload,
  })
  @Post('/single')
  async singleFileUpload(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: File,
  ) {
    try {
        //@ts-ignore
        const fileUrl = `${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}/`+file.filename
      return res.status(200).json({
        success: true,
        url : fileUrl
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './client',
        filename: (req, file, callback) => {
          return callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOkResponse({
    type: IMultipleFileUpload,
  })
  @Post('/multiple')
  async multipleFileUpload(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles() files: File[],
  ) {
    try {
      let urls = files.map((it)=>{
        return {
            //@ts-ignore
            name : it.filename,
            //@ts-ignore
            url : `${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}/`+it.filename
        }
      })
      urls = urls.filter((it)=>it)
      return res.status(200).json({
        success: true,
        urls
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
