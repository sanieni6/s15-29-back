import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { CLOUD_KEY, CLOUD_NAME, CLOUD_SECRET } from '../config/enviroments';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_KEY,
      api_secret: CLOUD_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}
