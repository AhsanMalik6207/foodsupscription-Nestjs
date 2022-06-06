import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class RegisterClientDto{
    @IsString()
    @IsNotEmpty({message:'The user should enter a name'})
    @ApiProperty({type:String,description:'name'})
    name: string;
    
    @IsNotEmpty({message:'The user should enter an email'})
    @IsString()
    @IsEmail()
    @ApiProperty({type:String,description:'email'})
    email: string;

    @IsNotEmpty({message:'The user should enter a password'})
    @IsString()
    @Length(8)
    @ApiProperty({type:String,description:'password'})
    password: string;
}