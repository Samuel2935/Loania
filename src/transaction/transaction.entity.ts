import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  loan_id: string;

  @Column()
  reference: string;

  @Column('decimal')
  amount: number;

  @Column()
  type: 'disbursement' | 'repayment';

  @Column({
    default: 'pending',
  })
  status: 'pending' | 'success' | 'failed';
}
