import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from "src/entities/course.entity";
import { StudentCourse } from "src/entities/student_course.entity";
import { Student } from "src/entities/student.entity";

import { StudentService } from "src/services/student.service";
import { StudentCourseService } from "src/services/student_course.service";

import { StudentController } from "src/controllers/student.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([Student]), TypeOrmModule.forFeature([StudentCourse])],
    controllers: [StudentController],
    providers: [StudentService, StudentCourseService]
})
export class StudentModule{}