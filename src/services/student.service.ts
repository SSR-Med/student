import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Student } from "../entities/student.entity";
import { StudentDto } from "../dtos/student.dto";

import { deleteBlankSpaces, capitalizeFirstLetter } from "src/helpers/FormatString";

@Injectable()
export class StudentService{
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ){}

    async create(studentDto: StudentDto): Promise<{message: string}>{
        try{
            studentDto.name = deleteBlankSpaces(studentDto.name);
            studentDto.name = capitalizeFirstLetter(studentDto.name);
            await this.studentRepository.save(studentDto);
            return {"message": "Student created"}
        }catch(err){
            throw new HttpException(err.message, 500);
        }
    }

    async delete(id: number): Promise<void>{
        const student = await this.studentRepository.findOneBy({id});
        if(!student){
            throw new HttpException('Student not found', 404);
        }
        await this.studentRepository.delete(id);
    }

    async findAll(): Promise<Student[]>{
        return await this.studentRepository.find();
    }

    async findOne(id: number): Promise<Student|null>{
        const student = await this.studentRepository.findOneBy({id});
        if(!student){
            throw new HttpException('Student not found', 404);
        }
        return await this.studentRepository.findOneBy({id});
    }

    async update(id: number, studentDto: StudentDto): Promise<string>{
        studentDto.name = deleteBlankSpaces(studentDto.name);
        studentDto.name = capitalizeFirstLetter(studentDto.name);
        const student = await this.studentRepository.findOneBy({id});
        if(!student){
            throw new HttpException('Student not found', 404);
        }
        await this.studentRepository.update(id, studentDto);
        return "Student updated";
    }

}