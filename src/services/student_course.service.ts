import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { StudentCourse } from "../entities/student_course.entity";
import { Student } from "../entities/student.entity";
import { Course } from "../entities/course.entity";

@Injectable()
export class StudentCourseService{
    constructor(
        @InjectRepository(StudentCourse)
        private studentCourseRepository: Repository<StudentCourse>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>
    ){}

    async addStudentToCourse(studentId: number, courseId: number): Promise<StudentCourse>{
        const student = await this.studentRepository.findOne({
            where: { id: studentId }
        });
        if(!student){
            throw new HttpException('Student not found', 404);
        }
        const course = await this.courseRepository.findOne({
            where: { id: courseId }
        });
        if(!course){
            throw new HttpException('Course not found', 404);
        }

        const amountOfStudents = await this.studentCourseRepository.count({
            where: { courseId }
        });

        if(amountOfStudents == course.studentMax){
            throw new HttpException('Course is full', 400);
        }

        try{
            const studentCourse = new StudentCourse();
            studentCourse.studentId = studentId;
            studentCourse.courseId = courseId;
            return await this.studentCourseRepository.save(studentCourse);
        }
        catch(err){
            throw new HttpException(err.message, 500);
        }
    }

    async removeStudentFromCourse(studentId: number, courseId: number): Promise<void>{
        const student = await this.studentRepository.findOne({
            where: { id: studentId }
        });
        if(!student){
            throw new HttpException('Student not found', 404);
        }
        const course = await this.courseRepository.findOne({
            where: { id: courseId }
        });
        if(!course){
            throw new HttpException('Course not found', 404);
        }

        const studentCourse = await this.studentCourseRepository.findOneBy({studentId, courseId});
        if(!studentCourse){
            throw new HttpException('Student not found in course', 404);
        }

        await this.studentCourseRepository.delete({studentId, courseId});
    }

    async getByStudentId(studentId: number): Promise<Course[]>{
        const courses = await this.courseRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.studentCourses', 'studentCourse')
            .where('studentCourse.studentId = :studentId', { studentId })
            .getMany();
        return courses
    }

    async getByCourseId(courseId: number): Promise<Student[]>{
        const students = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.studentCourses', 'studentCourse')
            .where('studentCourse.courseId = :courseId', { courseId })
            .getMany();
        return students
    }
}