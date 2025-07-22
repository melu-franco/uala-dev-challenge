export const HEADER_HEIGHT = '56px';

export const TIME_FILTERS = {
  daily: 'Diario',
  weekly: 'Semanal',
  monthly: 'Mensual',
} as const;

export const PAYMENT_METHODS = {
  qr: 'Código QR',
  mpos: 'mPOS',
  pospro: 'POS Pro',
  link: 'Link de pago',
} as const;

export const CARDS = {
  todas: 'Todas',
  visa: 'VISA',
  mastercard: 'MASTERCARD',
  amex: 'AMEX',
} as const;

export const INSTALLMENTS = [1, 2, 3, 6, 12] as const;

export type TimeFilter = keyof typeof TIME_FILTERS;
export type PaymentMethod = keyof typeof PAYMENT_METHODS;
export type Card = keyof typeof CARDS;
export type Installment = typeof INSTALLMENTS[number];

export const ALL_OPTION = 'todas' as const;
export type AllOption = typeof ALL_OPTION;
