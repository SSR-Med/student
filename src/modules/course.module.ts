import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from "../entities/course.entity";
import { StudentCourse } from "../entities/student_course.entity";
import { Student } from "../entities/student.entity";

import { CourseService } from "../services/course.service";
import { StudentCourseService } from "../services/student_course.service";

import { CourseController } from "../controllers/course.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([Student]), TypeOrmModule.forFeature([StudentCourse])],
    controllers: [CourseController],
    providers: [CourseService,StudentCourseService]
})
export class CourseModule{}