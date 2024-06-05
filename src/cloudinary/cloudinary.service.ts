import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, DeleteApiResponse } from 'cloudinary';

import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async getAllFiles(): Promise<UploadApiResponse[]> {
    const { resources } = await cloudinary.api.resources();
    return resources;
  }

  async getFile(publicId: string): Promise<UploadApiResponse> {
    const file = await cloudinary.api.resource(publicId);
    return file;
  }

  async deleteImage(publicId: string): Promise<DeleteApiResponse> {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  }
}
