import { Injectable } from "@nestjs/common";

@Injectable()
export class LoansService {
  async findOverdueLoans() {
    // Example: fetch loans where dueDate < today and status = 'pending'
    return this.repo.find({
      where: { dueDate: LessThan(new Date()), status: 'pending' },
    });
  }

  async markAsOverdue(loanId: string) {
    return this.repo.update(loanId, { status: 'overdue' });
  }
}