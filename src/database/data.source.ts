import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Loan } from '../loans/loans.entity';
import { Repayment } from 'src/repayments/repayment.entity';
import { User } from 'src/users/user.entity';
import { Transaction } from 'src/transaction/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'users',

  entities: [Loan, User, Repayment, Transaction],
  //migrations: ['src/migrations/*.ts'],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: true,
  logging: true,
});
