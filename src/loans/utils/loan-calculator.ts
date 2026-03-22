export function calculateLoan(amount: number, rate: number, duration: number) {
  const total = amount * (1 + rate);
  const monthly = total / duration;

  return { total, monthly };
}