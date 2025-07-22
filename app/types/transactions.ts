export interface Transaction {
  id: string;
  amount: number;
  card: string;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
}

export type TransactionPeriod = 'Diario' | 'Semanal' | 'Mensual';

export interface TransactionSummary {
  total: number;
  period: TransactionPeriod;
  transactions: Transaction[];
}
