import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repayments')
export class Repayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  loan_id: string;

  @Column('decimal')
  amount: number;

  @Column()
  due_date: Date;

  @Column({
    default: 'pending',
  })
  status: 'pending' | 'paid' | 'late';

  @Column({ nullable: true })
  paid_at: Date;
}
