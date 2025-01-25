import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from './modules/course.module';
import { StudentModule } from './modules/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT || '5432'),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
      extra: {
        ssl: {
            rejectUnauthorized: false,
        },
      },
    }), CourseModule, StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
