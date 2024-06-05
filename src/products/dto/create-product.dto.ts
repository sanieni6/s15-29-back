import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export enum Category {
  art = 'art',
  Antiques = 'antiques',
  Collectibles = 'collectibles',
  Technology = 'technology',
  Vehicles = 'vehicles',
  RealEstate = 'real estate',
}

export class CreateProductDto {
  @ApiProperty({ required: false, type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty({ message: 'The name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true, type: 'number' })
  @IsNotEmpty({ message: 'The initial_price field is required.' })
  @IsNumber()
  initial_price: number;

  @ApiProperty({ required: true, type: 'string' })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({ required: true, enum: Category })
  @IsNotEmpty({ message: 'The category field is required.' })
  @IsEnum(Category, {
    message:
      'The category must be one of the following: ' +
      Object.values(Category).join(', '),
  })
  category: Category;
}
