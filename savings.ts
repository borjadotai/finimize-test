// Calculates current month saving applying corresponding interest
export const applyInterestRate = (
  principal: number,
  monthlyDeposit: number,
  interestRate: number
) => (principal + monthlyDeposit) * (1 + interestRate / 12 / 100);

// Calculates all savings monthly and returns annual ones
export const calculateSavings = (
  initialSavings: number,
  monthlyDeposits: number,
  interestRate: number
) => {
  let i = 1;
  let lastValue = initialSavings;
  let annualAmounts = [];
  let result;
  while (i <= 600) {
    result = applyInterestRate(lastValue, monthlyDeposits, interestRate);
    lastValue = result;
    i % 12 == 0 && annualAmounts.push(result);
    i++;
  }

  return annualAmounts;
};
