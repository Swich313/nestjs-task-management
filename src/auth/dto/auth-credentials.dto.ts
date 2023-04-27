import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Username is too short, at least $constraint1 chars'})
    @MaxLength(20, {message: 'Username is too long, no more than $constraint1 chars'})
    username: string;

    @IsNotEmpty()
    @MinLength(10, {message: 'Password is too short, at least $constraint1 chars'})
    @MaxLength(32, {message: 'Password is too long, no more than $constraint1 chars'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak, should contain at least 1 capital letter and 1 number or special character'
    })
    password: string;
}