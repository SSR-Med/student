import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Course } from "src/entities/course.entity";
import { CourseDto } from "src/dtos/course.dto";

@Injectable()
export class CourseService{
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>
    ){}

    async create(courseDto: CourseDto): Promise<Course>{
        try{
            const course = await this.courseRepository.save(courseDto);
            return course;
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

    async update(id: number, courseDto: CourseDto): Promise<string>{
        const course = await this.courseRepository.findOneBy({id});
        if(!course){
            throw new HttpException('Course not found', 404);
        }
        await this.courseRepository.update(id, courseDto);
        return "Course updated";
    }
    
}