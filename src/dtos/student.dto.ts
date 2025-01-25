import { IsEmail, MinLength, IsString } from "class-validator";

export class StudentDto{
    @IsEmail()
    email: string

    @MinLength(3)
    @IsString()
    name: string
}