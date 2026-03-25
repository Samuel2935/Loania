import { IsEmail, IsNumber, Min } from 'class-validator';

export class InitPaymentDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(1, { message: 'Payment amount must be at least 1' })
  amount: number;
}
