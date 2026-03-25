import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoansService } from '../loans/loans.service';

@Injectable()
export class JobsService {
  constructor(private readonly loansService: LoansService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLatePayments(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const overdueLoans = await this.loansService.findOverdueLoans();

    for (const loan of overdueLoans) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      await this.loansService.markAsOverdue(loan.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`Marked ${overdueLoans.length} loans as overdue`);
  }
}
