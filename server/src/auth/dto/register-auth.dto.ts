import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./login-auth.dto";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class RegisterAuthDto {

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(20)
    password: string;
    
    @IsNotEmpty()
    name: string;
}