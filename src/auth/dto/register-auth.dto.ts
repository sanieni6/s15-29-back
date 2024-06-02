import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'password',
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  name: string;
}
