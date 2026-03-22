import { Controller, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import type { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  handleWebhook(@Req() req: Request) {
    // 1️⃣ Verify signature
    const signature = req.headers['x-paystack-signature'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;

    // Example: simple check (replace with crypto HMAC in production)
    if (!signature) {
      throw new Error('Invalid signature');
    }

    // 2️⃣ Process the payment asynchronously
    this.paymentsService.processWebhook(body);

    return { status: 'ok' };
  }
}
