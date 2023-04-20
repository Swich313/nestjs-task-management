import {IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @MinLength(3, {message: 'Title is too short, at least $constraint1 chars'})
    @MaxLength(10, {message: 'Title is too long, no more than $constraint1 chars'})
    title: string;

    @IsNotEmpty()
    @MinLength(3, {message: 'Description is too short, at least $constraint1 chars'})
    @MaxLength(10, {message: 'Description is too long, no more than $constraint1 chars'})
    description: string;
}