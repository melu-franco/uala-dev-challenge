import type { Transaction, TransactionPeriod, TransactionSummary } from '../types/transactions';
import { startOfDay, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';

const API_URL = 'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json';

interface RawTransaction {
  id?: string | number;
  amount?: number | string;
  card?: string;
  installments?: number | string;
  createdAt?: string;
  updatedAt?: string;
  paymentMethod?: string;
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache'
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Error al obtener las transacciones: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.transactions || !Array.isArray(data.transactions)) {
      console.error('API response does not contain transactions array:', data);
      return [];
    }

    const transactions = data.transactions.map((item: RawTransaction) => ({
      id: String(item.id || ''),
      amount: Number(item.amount || 0),
      card: String(item.card || ''),
      installments: Number(item.installments || 1),
      createdAt: String(item.createdAt || new Date().toISOString()),
      updatedAt: String(item.updatedAt || new Date().toISOString()),
      paymentMethod: item.paymentMethod || ''
    }));

    return transactions;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching transactions:', error.message);
    } else {
      console.error('Unknown error fetching transactions:', error);
    }
    throw error;
  }
};

export const getTransactionsByPeriod = (
  transactions: Transaction[],
  period: TransactionPeriod
): TransactionSummary => {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'Diario':
      startDate = startOfDay(now);
      break;
    case 'Semanal':
      startDate = startOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'Mensual':
      startDate = startOfMonth(now);
      break
  }

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    return isWithinInterval(transactionDate, {
      start: startDate,
      end: now
    });
  });

  const total = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return {
    total,
    period,
    transactions: filteredTransactions,
  };
};
