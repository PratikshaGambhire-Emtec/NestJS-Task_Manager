import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDTO{
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    userName: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    userPassword: string;
    
}