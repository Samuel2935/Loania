import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  interest_rate: number;

  @Column()
  duration_months: number;

  @Column({
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected' | 'repaid' | 'defaulted';

  @CreateDateColumn()
  created_at: Date;
}
