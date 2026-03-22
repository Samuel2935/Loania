import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

@Injectable()
export class PaymentsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processWebhook(_body: any) {
    throw new Error('Method not implemented.');
  }
  async initialize(
    amount: number,
    email: string,
  ): Promise<PaystackInitResponse> {
    const response = await axios.post<PaystackInitResponse>(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: amount * 100, // Paystack uses kobo
        email,
      },
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
