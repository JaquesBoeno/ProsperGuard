export interface Results {
  fv: number
  totalInvested: number
  totalDividends: number
}

export const CompoundInterest = (
  C: number /* Initial Value */,
  I: number /* Interest per month */,
  T: number /* Period/Time in months */
) => {
  const fv = C * (1 + I) ** T
  const totalDividends = fv - C
  return { fv, totalInvested: C, totalDividends }
}

export const FvWithMonthly /* Monthly Contribution With Compound Interest */ = (
  R: number /* Monthly Contribution */,
  I: number /* Interest per month */,
  T: number /* Interest per month */
) => {
  const fv = R * (((1 + I) ** T - 1) / I)
  const totalInvested = R * T
  const totalDividends = fv - totalInvested

  return { fv, totalInvested, totalDividends }
}

export const FvWithMonthlyAndInitial = (
  C: number /* Initial Value */,
  R: number /* Monthly Contribution */,
  I: number /* Interest per month */,
  T: number /* Interest per month */
) => {
  const fv = CompoundInterest(C, I, T).fv + FvWithMonthly(R, I, T).fv
  const totalInvested = C + R * T
  const totalDividends = fv - totalInvested

  return { fv, totalInvested, totalDividends }
}

export const EquivalenceOfFees = (i: number, to: 'monthly' | 'yearly') => {
  if (to == 'yearly') return (1 + i) ^ (12 - 1)
  else if (to == 'monthly') return (1 + i) ^ (1 / 12 - 1)
}
