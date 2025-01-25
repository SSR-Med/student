import { Entity, Column, PrimaryGeneratedColumn,
    OneToMany
 } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';

import { StudentCourse } from './student_course.entity';

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    @IsEmail()
    email: string

    @Column()
    @MinLength(3)
    name: string

    @OneToMany(() => StudentCourse, studentCourse => studentCourse.students)
    studentCourses: StudentCourse[]
}