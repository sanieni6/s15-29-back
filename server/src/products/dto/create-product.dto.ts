import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  date: string;

  @IsNumber()
  price: number;

  @IsNumber()
  selled: number;

  @IsString()
  product_categories: string;

  @IsString()
  status: string;
}
