import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { testDB } from '../config/database.config';

import { CourseService } from '../services/course.service';
import { StudentCourseService } from '../services/student_course.service';
import { StudentService } from '../services/student.service';

import { Course } from '../entities/course.entity';
import { Student } from '../entities/student.entity';
import { StudentCourse } from '../entities/student_course.entity';

import { StudentController } from '../controllers/student.controller';
import { CourseController } from '../controllers/course.controller';

describe('StudentController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                testDB,
                TypeOrmModule.forFeature([Course, Student, StudentCourse]),
            ],
            controllers: [StudentController, CourseController],
            providers: [StudentService, StudentCourseService, CourseService],
        }).compile();

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init(); 

        request(app.getHttpServer())
                .post('/student')
                .send({
                    name: faker.person.firstName(),
                    email: faker.internet.email(),
                })
                .then((response) => {
                    return request(app.getHttpServer())
                        .post('/course')
                        .send({
                            name: faker.person.firstName(),
                            studentMax: 1,
                            credits: faker.number.int({ min: 1, max: 10 }),
                        })

                })
    });

    describe("PATCH /course/:id/students", () => {

        it("Invalid type", async () => {
            await request(app.getHttpServer())
                .patch(`/course/1/students`)
                .query({
                    studentId: 1,
                    type: 'invalid',
                })
                .expect(400);
        });

        it("Student not found", async () => {
            await request(app.getHttpServer())
                .patch(`/course/1/students`)
                .query({
                    studentId: 9999, 
                    type: 'add',
                })
                .expect(404);
        });

        it("Course not found", async () => {
            await request(app.getHttpServer())
                .patch(`/course/9999/students`) 
                .query({
                    studentId: 1,
                    type: 'add',
                })
                .expect(404);
        });


        it("Should add and remove a student to a course", async () => {
            
            return request(app.getHttpServer())
                .patch(`/course/1/students`)
                .query({
                    studentId: 1,
                    type: 'add',
                })
                .expect(200)
                .expect({
                    message: 'Student added/removed from course',
                })
                .then((res)=> {
                    return request(app.getHttpServer())
                        .patch(`/course/1/students`)
                        .query({
                            studentId: 1,
                            type: 'remove',
                        })
                        .expect(200)
                        .expect({
                            message: 'Student added/removed from course',
                        });
                })
        });

        it("Add student to a full course", async () => {
            return request(app.getHttpServer())
                .patch(`/course/1/students`)
                .query({
                    studentId: 1,
                    type: 'add',
                })
                .expect(200)
                .expect({
                    message: 'Student added/removed from course',
                })
                .then((res)=> {
                    return request(app.getHttpServer())
                        .patch(`/course/1/students`)
                        .query({
                            studentId: 1,
                            type: 'add',
                        })
                        .expect(400)
                        .expect({ statusCode: 400, message: 'Course is full' });
                })
        })
    });
});
