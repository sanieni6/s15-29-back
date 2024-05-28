import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

}