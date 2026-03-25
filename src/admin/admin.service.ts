import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../loans/loans.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepo: Repository<Loan>,
  ) {}

  async approveLoan(id: string): Promise<Loan> {
    // 1️⃣ Find the loan
    const loan = await this.loanRepo.findOne({
      where: { id },
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    // 2️⃣ Prevent double approval
    if (loan.status === 'approved') {
      throw new BadRequestException('Loan already approved');
    }

    if (loan.status === 'rejected') {
      throw new BadRequestException('Cannot approve a rejected loan');
    }

    // 3️⃣ Approve loan
    loan.status = 'approved';
    loan.approvedAt = new Date();

    // 4️⃣ Save changes
    await this.loanRepo.save(loan);

    return loan;
  }
}
