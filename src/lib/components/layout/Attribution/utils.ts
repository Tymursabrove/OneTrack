import LocalStorage from '$lib/local-packages/LocalStorage'

export function getAverage (nums: number[] | string[], fractionDigits: number = 2) {
  const average = (nums.map(Number).reduce((a, b) => a + b, 0) / nums.length) || 0
  return fractionDigits ? average.toFixed(fractionDigits) : average
}

export function getAverageExcludeZeros (nums: number[] | string[], fractionDigits: number = 2) {
  const average = (nums.map(Number).filter(Boolean).reduce((a, b) => a + b, 0) / nums.length) || 0
  return fractionDigits ? average.toFixed(fractionDigits) : average
}

export function getSum (nums: number[] | string[], fractionDigits: number = 2) {
  const average = nums.map(Number).reduce((a, b) => a + b, 0) || 0
  return fractionDigits ? average.toFixed(fractionDigits) : average
}

export function getQuotient (divisor: number | string, dividend: number | string, fractionDigits: number = 2) {
  let quotient = Number(divisor) / Number(dividend)
  if (!isFinite(quotient) || !quotient) quotient = 0
  return fractionDigits ? quotient.toFixed(fractionDigits) : quotient
}

export function formatCurrency (num: number) {
  const currency = LocalStorage.get('workspace_currency') ?? 'XXX'
  const locale = LocalStorage.get('workspace_locale') ?? 'de-DE'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num)
}