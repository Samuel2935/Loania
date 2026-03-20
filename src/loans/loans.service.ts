async apply(userId: string, amount: number, duration: number) {
  // fake income check (replace later)
  const monthlyIncome = 50000;

  if (amount > monthlyIncome * 2) {
    throw new Error('Loan too large');
  }

  const loan = this.repo.create({
    user_id: userId,
    amount,
    duration_months: duration,
    interest_rate: 0.1,
  });

  return this.repo.save(loan);
}