import { Injectable } from '@nestjs/common';
import { LessThan } from 'typeorm';

@Injectable()
export class LoansService {
  findOne: any;
  findByUserId(id: any) {
    throw new Error('Method not implemented.');
  }
  create(arg0: { userId: any; amount: number; }) {
    throw new Error('Method not implemented.');
  }
  repo: any;
  // eslint-disable-next-line @typescript-eslint/require-await
  async findOverdueLoans() {
    // Example: fetch loans where dueDate < today and status = 'pending'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.repo.find({
      where: { dueDate: LessThan(new Date()), status: 'pending' },
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async markAsOverdue(loanId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.repo.update(loanId, { status: 'overdue' });
  }
}
