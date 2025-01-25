import { Controller,
    Get, Post, Body, Put, Delete, Patch,
    Param, Query,
    HttpException
 } from "@nestjs/common";

import { CourseService } from "../services/course.service";
import { CourseDto } from "../dtos/course.dto";
import { StudentCourseService } from "../services/student_course.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller("/course")
export class CourseController{
    constructor(private readonly courseService: CourseService,
        private readonly StudentCourseService: StudentCourseService
    ) {}

    @ApiBody({type: CourseDto,
        description: "Course data",
        examples: {
            a : {
                value: {
                    "name": "Math",
                    "studentMax": 10,
                    "credits": 5
                }
            }
        }
    })
    @ApiCreatedResponse({description: "Course created"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @Post()
    async create(@Body() courseDto: CourseDto){
        try{
            return await this.courseService.create(courseDto);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Delete("/:id")
    @ApiOkResponse({description: "Course deleted"})
    @ApiNotFoundResponse({description: "Course not found"})
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
    @ApiOkResponse()
    @ApiNotFoundResponse({description: "Course not found"})
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
    @ApiBadRequestResponse({description: "Invalid type"})
    @ApiNotFoundResponse({description: "Course not found"})
    @ApiOkResponse({description: "Student added/removed from course"})
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
    @ApiOkResponse({description: "Course updated"})
    @ApiBody({type: CourseDto,
        description: "Course data",
        examples: {
            a : {
                value: {
                    "name": "Math",
                    "studentMax": 10,
                    "credits": 5
                }
            }
        }
    })
    @ApiNotFoundResponse({description: "Course not found"})
    @ApiInternalServerErrorResponse({description: "Internal server error"})
    @ApiBadRequestResponse()
    async update(@Param('id') id: number, @Body() courseDto: CourseDto){
        try{
            return await this.courseService.update(id, courseDto);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}