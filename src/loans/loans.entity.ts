import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Entity()
export class Loan {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Column()
  user_id: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Column()
  amount: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Column()
  interest_rate: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Column()
  duration_months: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Column({ default: 'pending' })
  status: string;
  approvedAt: Date;
}
