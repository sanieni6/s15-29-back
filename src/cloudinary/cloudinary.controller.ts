import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(jpg|png|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Get()
  async getAllFiles() {
    return this.cloudinaryService.getAllFiles();
  }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    const file = await this.cloudinaryService.getFile(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    const response = await this.cloudinaryService.deleteImage(id);
    return response;
  }
}
