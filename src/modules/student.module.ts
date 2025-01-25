import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from "../entities/course.entity";
import { StudentCourse } from "../entities/student_course.entity";
import { Student } from "../entities/student.entity";

import { StudentService } from "../services/student.service";
import { StudentCourseService } from "../services/student_course.service";

import { StudentController } from "../controllers/student.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([Student]), TypeOrmModule.forFeature([StudentCourse])],
    controllers: [StudentController],
    providers: [StudentService, StudentCourseService]
})
export class StudentModule{}