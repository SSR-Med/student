import { Entity, PrimaryColumn,
    ManyToOne, JoinColumn
 } from "typeorm";

import { Student } from "./student.entity";
import { Course } from "./course.entity";

@Entity('student_course')
export class StudentCourse {
    @PrimaryColumn({ name: 'studentId' })
    studentId: number

    @PrimaryColumn({ name: 'courseId' })
    courseId: number

    @ManyToOne(() => Student,
    {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn([{ name: 'studentId', referencedColumnName: 'id' }])
    students: Student

    @ManyToOne(() => Course,
    {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn([{ name: 'courseId', referencedColumnName: 'id' }])
    courses: Course
}