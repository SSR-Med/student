import { Controller, Get, Post, Body, Put, Delete, Param, HttpException } from '@nestjs/common';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../dtos/student.dto';
import { StudentCourseService } from '../services/student_course.service';

@Controller('/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentCourseService: StudentCourseService,
  ) {}

  @Post()
  async create(@Body() studentDto: StudentDto) {
    try {
      return await this.studentService.create(studentDto);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      await this.studentService.delete(id);
      return { message: 'Student deleted' };
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.studentService.findAll();
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.studentService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Get('/:id/courses')
  async getCourses(@Param('id') id: number) {
    try {
      return await this.studentCourseService.getByStudentId(id);
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() studentDto: StudentDto) {
    try {
      await this.studentService.update(id, studentDto);
      return { message: 'Student updated' };
    } catch (err) {
      throw new HttpException(err.message, err.status); 
    }
  }
}