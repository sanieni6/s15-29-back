import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Create a new user',
    type: CreateUserDto,
    examples: {
      example: {
        value: {
          name: 'John',
          lastName: 'Doe',
          email: 'example1@example.com',
          password: '12345678',
          role: 'user',
          address: '123 Main St',
          isActive: true,
          image: 'a file',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadResponse = await this.cloudinaryService.uploadFile(file);
      createUserDto.image = uploadResponse.url;
    }
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved users.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved user.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The user ID' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated user.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The user ID' })
  @ApiBody({
    description: 'Update a user',
    examples: {
      example: {
        value: {
          name: 'Johnny',
          lastName: 'Doe',
          email: 'john2@example.com',
          password: '12345678',
          role: 'user',
          address: '123 Main St',
          isActive: true,
        },
      },
    },
    type: UpdateUserDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadResponse = await this.cloudinaryService.uploadFile(file);
      updateUserDto.image = uploadResponse.url; // Guardar la URL de la imagen en el DTO
    }
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Partially update a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated user.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The user ID' })
  @ApiBody({
    description: 'Partially update a user',
    examples: {
      example: {
        value: {
          lastName: 'Does',
        },
      },
    },
    type: UpdateUserDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadResponse = await this.cloudinaryService.uploadFile(file);
      updateUserDto.image = uploadResponse.url; // Guardar la URL de la imagen en el DTO
    }
    return this.usersService.partialUpdate(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted user.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The user ID' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
