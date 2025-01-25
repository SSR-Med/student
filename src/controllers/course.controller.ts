import { Controller,
    Get, Post, Body, Put, Delete, Patch,
    Param, Query,
    HttpException
 } from "@nestjs/common";

import { CourseService } from "src/services/course.service";
import { CourseDto } from "src/dtos/course.dto";
import { StudentCourseService } from "src/services/student_course.service";

@Controller("/course")
export class CourseController{
    constructor(private readonly courseService: CourseService,
        private readonly StudentCourseService: StudentCourseService
    ) {}

    @Post()
    async create(@Body() courseDto: CourseDto){
        try{
            await this.courseService.create(courseDto);
            return {"message": "Course created"};
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Delete("/:id")
    async delete(@Param('id') id: number){
        try{
            await this.courseService.delete(id);
            return {"message": "Course deleted"};
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Get()
    async findAll(){
        return await this.courseService.findAll();
    }

    @Get("/:id")
    async findOne(@Param('id') id: number){
        try{
            return await this.courseService.findOne(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Get("/:id/students")
    async getStudents(@Param('id') id: number){
        try{
            return await this.StudentCourseService.getByCourseId(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Patch("/:id/students")
    async addStudent(@Param('id') id: number, @Query('studentId') studentId: number,
    @Query('type') type: string){
        try{
            if(type === 'add'){
                await this.StudentCourseService.addStudentToCourse(studentId, id);
            } else if(type === 'remove'){
                await this.StudentCourseService.removeStudentFromCourse(studentId, id);
            } else{
                throw new HttpException('Invalid type', 400);
            }
            return {"message": "Student added/removed from course"};
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
        
    }

    @Put("/:id")
    async update(@Param('id') id: number, @Body() courseDto: CourseDto){
        try{
            await this.courseService.update(id, courseDto);
            return {"message": "Course updated"};
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}