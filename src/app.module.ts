import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CourseModule } from './modules/course.module';
import { StudentModule } from './modules/student.module';

import { prodDB } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    prodDB, CourseModule, StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
