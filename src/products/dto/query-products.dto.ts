import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum CategoriesEnum {
  Art = 'Art',
  Antiques = 'Antiques',
  Collectibles = 'Collectibles',
  Technology = 'Technology',
  Vehicles = 'Vehicles',
  RealEstate = 'Real Estate',
}

export class QueryProductsDto {
  @IsNotEmpty({ message: 'Limit cannot be empty' })
  @IsString({
    message: 'Limit must be a string representing an integer passed by query',
  })
  @ApiProperty({ description: 'Results limit', default: '12' })
  limit: string;

  @IsNotEmpty({ message: 'Page cannot be empty' })
  @IsString({
    message: 'Page must be a string representing an integer passed by query',
  })
  @ApiProperty({ description: 'Results page', default: '1' })
  page: string;

  @IsOptional()
  @IsEnum(OrderEnum)
  @IsString({ message: 'Product ordering by price' })
  @ApiProperty({
    name: 'order',
    required: false,
    enum: OrderEnum,
    description: 'Ordering by price',
  })
  order?: OrderEnum;

  @IsOptional()
  @IsString({
    message: 'The minimum price value must be a string',
  })
  @ApiProperty({
    name: 'minPrice',
    required: false,
    type: String,
    description: 'Minimum price',
  })
  minPrice?: string;

  @IsOptional()
  @IsString({
    message: 'The maximum price value must be a string',
  })
  @ApiProperty({
    name: 'maxPrice',
    required: false,
    type: String,
    description: 'Maximum price',
  })
  maxPrice?: string;

  @IsOptional()
  @IsEnum(CategoriesEnum)
  @IsString({ message: 'The category must be a string' })
  @ApiProperty({
    name: 'category',
    required: false,
    enum: CategoriesEnum,
    description: 'Category',
  })
  category?: CategoriesEnum;

  @IsOptional()
  @IsString({
    message: 'The search value must be a string',
  })
  @ApiProperty({
    name: 'search',
    required: false,
    description: 'Attribute value to filter',
  })
  search?: string;
}
