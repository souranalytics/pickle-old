export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency'
  }).format(amount)
