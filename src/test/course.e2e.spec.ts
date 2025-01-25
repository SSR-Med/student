import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { testDB } from '../config/database.config';

import { CourseController } from '../controllers/course.controller';
import { CourseService } from '../services/course.service';
import { StudentCourseService } from '../services/student_course.service';

import { Course } from "../entities/course.entity";
import { StudentCourse } from "../entities/student_course.entity";
import { Student } from "../entities/student.entity";

describe('CourseController', () => {
    let app: INestApplication;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                testDB
                ,TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([Student]), TypeOrmModule.forFeature([StudentCourse])],
            controllers: [CourseController],
            providers: [CourseService, StudentCourseService],
            
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    describe('POST /course', () => {
        it('should create a course', () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201)
                .expect({
                    "message": "Course created"
                })
        });

        it("Repeated course name",async () => {
            const course = {
                name: "Math",
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201).then(()=> {
                    return request(app.getHttpServer())
                    .post('/course')
                    .send(course)
                    .expect(500)
                })
        })

        it("StudentMax less than 1",async () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: 0,
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(400)
        })

        it("Credits less than 1",async () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: 0,
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(400)
        })

        it("Name less than 3",async () => {
            const course = {
                name: "ab",
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(400)
        })
    })

    describe('GET /course', () => {
        const course = {
            name: faker.person.firstName(),
            studentMax: faker.number.int({ min: 1, max: 100 }),
            credits: faker.number.int({ min: 1, max: 10 }),
        };
        it('should return all courses', async () => {
            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .get('/course')
                        .expect(200)
                        .expect(
                            [
                                {id: 1, ...course}
                            ]
                        );
                });
        });
    })

    describe('GET /course/:id', () => {

        it('should return a course', async () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .get('/course/1')
                        .expect(200)
                        .expect(
                            {id: 1, ...course}
                        );
                });
        })

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .get('/course/122')
                .expect(404)
        })
    })

    describe('Delete /course/:id', () => {
        it('should delete a course', async () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .delete('/course/1')
                        .expect(200)
                        .expect(
                            {"message": "Course deleted"}
                        );
                });
        })

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .delete('/course/122')
                .expect(404)
        })
    })

    describe('PUT /course/:id', () => {

        it('should update a course', async () => {
            const course = {
                name: faker.person.firstName(),
                studentMax: faker.number.int({ min: 1, max: 100 }),
                credits: faker.number.int({ min: 1, max: 10 }),
            };

            return request(app.getHttpServer())
                .post('/course')
                .send(course)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .put('/course/1')
                        .send({
                            name: "New Name",
                            studentMax: 10,
                            credits: 10
                        })
                        .expect(200)
                        .expect(
                            {"message": "Course updated"}
                        );
                });
        })

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .put('/course/122')
                .send({
                    name: "New Name",
                    studentMax: 10,
                    credits: 10
                })
                .expect(404)
        })
    })
    

})