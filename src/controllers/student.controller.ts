import { Controller, Get, Post, Body, Put, Delete, Param, HttpException } from '@nestjs/common';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../dtos/student.dto';
import { StudentCourseService } from '../services/student_course.service';

import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller('/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentCourseService: StudentCourseService,
  ) {}

  @Post()
  @ApiBody({
    type: StudentDto,
    description: 'Student data',
    examples: {
      a: {
        value: {
          name: 'John Doe',
          email: 'sa@gmail.com'
        }
      }
    }
  })
  @ApiCreatedResponse({ description: 'Student created' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() studentDto: StudentDto) {
    try {
      return await this.studentService.create(studentDto);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Student deleted' })
  @ApiNotFoundResponse({ description: 'Student not found' })
  async delete(@Param('id') id: number) {
    try {
      await this.studentService.delete(id);
      return { message: 'Student deleted' };
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get()
  @ApiOkResponse()
  async findAll() {
    try {
      return await this.studentService.findAll();
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get('/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Student not found' })
  async findOne(@Param('id') id: number) {
    try {
      return await this.studentService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get('/:id/courses')
  @ApiOkResponse()
  async getCourses(@Param('id') id: number) {
    try {
      return await this.studentCourseService.getByStudentId(id);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Put('/:id')
  @ApiBadRequestResponse({ description: 'Invalid type' })
  @ApiNotFoundResponse({ description: 'Student not found' })
  @ApiOkResponse({ description: 'Student updated' })
  @ApiBody({
    type: StudentDto,
    description: 'Student data',
    examples: {
      a: {
        value: {
          name: 'John Doe',
          email: 'sa@gmail.com'
        }
      }
    }
  })
  async update(@Param('id') id: number, @Body() studentDto: StudentDto) {
    try {
      await this.studentService.update(id, studentDto);
      return { message: 'Student updated' };
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }
}