import { Optional } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @Optional()
    email: string;


    @IsString()
    @Optional()
    password: string;
}