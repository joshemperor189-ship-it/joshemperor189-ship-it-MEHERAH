export interface RepaymentScheduleItem {
  installmentNumber: number;
  dueDate: string;
  principalAmount: number;
  interestAmount: number;
  totalInstallment: number;
  remainingBalance: number;
}

export class RepaymentPlanner {
  public static generateSchedule(amount: number, annualRatePercent: number, tenureMonths: number): RepaymentScheduleItem[] {
    const monthlyRate = annualRatePercent / 100 / 12;
    const monthlyInstallment = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    const schedule: RepaymentScheduleItem[] = [];
    let balance = amount;

    const startDate = new Date();

    for (let i = 1; i <= tenureMonths; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyInstallment - interest;
      balance = Math.max(0, balance - principal);

      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      schedule.push({
        installmentNumber: i,
        dueDate: dueDate.toISOString().split('T')[0],
        principalAmount: Number(principal.toFixed(2)),
        interestAmount: Number(interest.toFixed(2)),
        totalInstallment: Number(monthlyInstallment.toFixed(2)),
        remainingBalance: Number(balance.toFixed(2))
      });
    }

    return schedule;
  }
}
