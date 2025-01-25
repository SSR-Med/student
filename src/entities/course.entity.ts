import { Entity, Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Min,
    MinLength
 } from 'class-validator';

import { StudentCourse } from './student_course.entity';

@Entity()
export class Course{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    @MinLength(3)
    name: string

    @Column()
    @Min(1)
    studentMax: number

    @Column()
    @Min(1)
    credits: number

    @OneToMany(() => StudentCourse, studentCourse => studentCourse.courses)
    studentCourses: StudentCourse[]
}