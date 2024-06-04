import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength, MinLength,  } from "class-validator";

export class LoginAuthDto {
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
}