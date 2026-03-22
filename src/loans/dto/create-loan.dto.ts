import { IsInt, IsNumber } from 'class-validator';

export class CreateLoanDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  amount: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  duration: number;
}
