import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import * as crypto from 'crypto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Initialize payment
  @Post('initialize')
  async initialize(@Body() body: any) {
    return this.paymentsService.initialize(
      body.amount,
      body.email,
    );
  }

  // 🔥 Webhook endpoint
  @Post('webhook')
  async handleWebhook(
    @Req() req: any,
    @Headers('x-paystack-signature') signature: string,
  ) {
    const secret = process.env.PAYSTACK_SECRET;

    // Verify webhook
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid signature');
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      const reference = event.data.reference;

      await this.paymentsService.verify(reference);
    }

    return { received: true };
  }
}