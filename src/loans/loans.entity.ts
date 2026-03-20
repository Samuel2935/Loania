import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  amount: number;

  @Column()
  interest_rate: number;

  @Column()
  duration_months: number;

  @Column({ default: 'pending' })
  status: string;
}