import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      id: result.public_id,
      url: result.url,
      secure_url: result.secure_url,
    };
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    const { result } = await this.cloudinaryService.deleteImage(id);
    if (result === 'ok') {
      return 'It was deleted correctly';
    } else {
      return 'There is no file with this id';
    }
  }
}
