import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { testDB } from '../config/database.config';

import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';
import { StudentCourseService } from '../services/student_course.service';

import { Course } from '../entities/course.entity';
import { Student } from '../entities/student.entity';
import { StudentCourse } from '../entities/student_course.entity';

describe('StudentController', () => {
    let app: INestApplication

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                testDB,
                TypeOrmModule.forFeature([Course]),
                TypeOrmModule.forFeature([Student]),
                TypeOrmModule.forFeature([StudentCourse]),
            ],
            controllers: [StudentController],
            providers: [StudentService, StudentCourseService]
        }).compile();

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    })

    describe('POST /student', () => {
        it('should create a student', () => {
            const student = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
            };

            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201)
                .expect({
                    "message": "Student created"
                })
        });

        it("Repeated student email",async () => {
            const student = {
                name: "John",
                email: faker.internet.email(),
            };
            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201).then(()=> {
                    return request(app.getHttpServer())
                        .post('/student')
                        .send(student)
                        .expect(500)
                })
        })

        it("Invalid email",async () => {
            const student = {
                name: "John",
                email: "invalidemail",
            };
            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(400)
        })

        it("Name less than 3 characters",async () => {
            const student = {
                name: "Jo",
                email: faker.internet.email(),
            };
            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(400)
        })

    })

    describe('GET /student', () => {
        const student = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
        };

        it('should get all students', () => {
            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .get('/student')
                        .expect(200)
                        .expect([{
                            id: 1,
                            ...student
                        }])
                })
        });
    })

    describe('GET /student/:id', () => {

        it('should get a student', async () => {
            const student = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
            };

            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .get('/student/1')
                        .expect(200)
                        .expect({
                            id: 1,
                            ...student
                        })
                })
        });

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .get('/student/122')
                .expect(404)
        });
    })

    describe('Delete /student/:id', () => {
        it('should delete a student', async () => {
            const student = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
            };

            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .delete('/student/1')
                        .expect(200)
                        .expect({
                            "message": "Student deleted"
                        })
                })
        });

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .delete('/student/122')
                .expect(404)
        });
    })

    describe('PUT /student/:id', () => {

        it('should update a student', async () => {
            const student = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
            };

            return request(app.getHttpServer())
                .post('/student')
                .send(student)
                .expect(201)
                .then(() => {
                    return request(app.getHttpServer())
                        .put('/student/1')
                        .send({
                            name: "John",
                            email: faker.internet.email()
                        })
                        .expect(200)
                        .expect({
                            "message": "Student updated"
                        })
                })
        })

        it('should return 404', async () => {
            return request(app.getHttpServer())
                .put('/student/122')
                .send({
                    name: "John",
                    email: faker.internet.email()
                })
                .expect(404)
        })

    })


    

})