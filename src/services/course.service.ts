import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Course } from "../entities/course.entity";
import { CourseDto } from "../dtos/course.dto";

import { deleteBlankSpaces, capitalizeFirstLetter } from "src/helpers/FormatString";

@Injectable()
export class CourseService{
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>
    ){}

    async create(courseDto: CourseDto): Promise<{message: string}>{
        try{
            courseDto.name = deleteBlankSpaces(courseDto.name);
            courseDto.name = capitalizeFirstLetter(courseDto.name);
            await this.courseRepository.save(courseDto);
            return {message: 'Course created'}
        }catch(err){
            throw new HttpException(err.message, 500);
        }
        
    }

    async delete(id: number): Promise<void>{
        const course = await this.courseRepository.findOneBy({id});
        if(!course){
            throw new HttpException('Course not found', 404);
        }
        await this.courseRepository.delete(id);
    }

    async findAll(): Promise<Course[]>{
        return await this.courseRepository.find();
    }

    async findOne(id: number): Promise<Course|null>{
        const course = await this.courseRepository.findOneBy({id});
        if(!course){
            throw new HttpException('Course not found', 404);
        }
        return await this.courseRepository.findOneBy({id});
    }

    async update(id: number, courseDto: CourseDto): Promise<{message: string}>{
        courseDto.name = deleteBlankSpaces(courseDto.name);
        courseDto.name = capitalizeFirstLetter(courseDto.name);
        const course = await this.courseRepository.findOneBy({id});
        if(!course){
            throw new HttpException('Course not found', 404);
        }
        await this.courseRepository.update(id, courseDto);
        return {"message": "Course updated"};
    }
    
}