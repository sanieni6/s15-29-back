import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'email',
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'password',
    example: '12345678',
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;
}
