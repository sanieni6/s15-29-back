import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio_inicial: number;

  @IsString()
  imagen: string;

  @IsUUID()
  category: string;
}
