import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'The unique identifier of the user',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    minLength: 8,
    maxLength: 20,
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  role: string;

  @ApiPropertyOptional({
    description: 'The address of the user',
    example: '123 Main St',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({
    description: 'Indicates if the user is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional(
    {
      description: 'The image of the user',
    }
  )
  @IsOptional()
  image?: Express.Multer.File;

}
