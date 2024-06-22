export enum CHECKOUTSTEPS {
  'continue',
  'connect-wallet',
  'select-token',
  'approve',
  // 'complete-payment',
  'transaction-pending',
  'transaction-result',
}

export type TokenData = {
  address: `0x${string}`
  decimal: number
  name: string
  symbol: string
  balance: number
  chainId: number
}

export type PaymentMethodSubmitData = {
  type: 'stripe' | 'crypto'
  // If you've added extra fields to the form, type them here
  email: string
}
