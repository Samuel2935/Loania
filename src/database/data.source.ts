import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Loan } from '../loans/loans.entity';
// import other entities here

export const AppDataSource = new DataSource({
  type: 'postgres', // or 'mysql'
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'loan_app',

  entities: [Loan], // add all your entities here
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: true,
});
