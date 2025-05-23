import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');
import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'products',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);

          console.log('RESULTADO DE CLOUDINARY:', result);

          resolve(result as UploadApiResponse);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
