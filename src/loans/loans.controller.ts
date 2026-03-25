import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLoanDto } from './dto/create-loan.dto';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    id: string;
    email?: string;
  };
}

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // Request a new loan
  @UseGuards(JwtAuthGuard)
  @Post()
  // eslint-disable-next-line @typescript-eslint/require-await
  async requestLoan(@Req() req: AuthRequest, @Body() body: CreateLoanDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.loansService.create({
      userId: req.user.id,
      amount: body.amount,
    });
  }

  // Get all loans of the logged-in user
  @UseGuards(JwtAuthGuard)
  @Get()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getMyLoans(@Req() req: AuthRequest) {
    return this.loansService.findByUserId(req.user.id);
  }

  // Get a single loan by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getLoan(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.loansService.findOne(id);
  }
}
