import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    address: string;

    @IsBoolean()
    isActive: boolean;

}