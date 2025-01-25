import { TypeOrmModule } from '@nestjs/typeorm';

let sslOptions;
if (process.env.SSL === 'true') {
  sslOptions = {
    ssl: true,
    extra: {
      ssl: {
          rejectUnauthorized: false,
      },
    }
  } 
} else {
  sslOptions = {
    ssl: false,
  }
}


export const prodDB = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432'),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    autoLoadEntities: true,
    ... sslOptions
})

export const testDB = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PGHOST_TEST,
    port: parseInt(process.env.PGPORT_TEST || '5432'),
    username: process.env.PGUSER_TEST,
    password: process.env.PGPASSWORD_TEST,
    database: process.env.PGDATABASE_TEST,
    synchronize: true,
    autoLoadEntities: true,
    ssl: true,
    dropSchema: true,
    extra: {
      ssl: {
          rejectUnauthorized: false,
      },
    },
    
})