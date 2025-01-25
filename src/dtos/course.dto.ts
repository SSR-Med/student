import { IsString, IsNumber,
    Min, MinLength
 } from 'class-validator';

export class CourseDto{
    @IsString()
    @MinLength(3)
    name: string

    @IsNumber()
    @Min(1)
    studentMax: number

    @IsNumber()
    @Min(1)
    credits: number
}
