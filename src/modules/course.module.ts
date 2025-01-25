import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from "src/entities/course.entity";
import { StudentCourse } from "src/entities/student_course.entity";
import { Student } from "src/entities/student.entity";

import { CourseService } from "src/services/course.service";
import { StudentCourseService } from "src/services/student_course.service";

import { CourseController } from "src/controllers/course.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([Student]), TypeOrmModule.forFeature([StudentCourse])],
    controllers: [CourseController],
    providers: [CourseService,StudentCourseService]
})
export class CourseModule{}