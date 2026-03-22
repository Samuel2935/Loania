import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import axios from 'axios';

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Processor('payments')
export class PaymentProcessor {
  // This listens to jobs added to the "verify" queue
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Process('verify')
  async handle(job: Job<{ reference: string }>) {
    const { reference } = job.data;

    const result = await this.verifyPayment(reference);

    // TODO: update DB / trigger business logic based on result
    console.log('Verification result:', result);

    return result;
  }

  // Make this a class method instead of inner function
  private async verifyPayment(
    reference: string,
  ): Promise<PaystackVerifyResponse> {
    const response = await axios.get<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
