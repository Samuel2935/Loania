// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loans/loans.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Loan, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

// better option

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from './data-source';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(AppDataSource.options),
//   ],
// })
// export class AppModule {}
