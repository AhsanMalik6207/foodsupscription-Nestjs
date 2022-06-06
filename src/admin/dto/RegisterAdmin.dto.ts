import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterAdminDto{
    @IsNotEmpty({message:'The admin should enter an email'})
    @IsString()
    @IsEmail()
    @ApiProperty({type:String,description:'email'})
    email: string;

    @IsNotEmpty({message:'The admin should enter a password'})
    @IsString()
    @Length(8)
    @ApiProperty({type:String,description:'password'})
    password: string;
}