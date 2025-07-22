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

const fetchFromAPI = async (): Promise<Transaction[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache'
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.transactions || !Array.isArray(data.transactions)) {
      throw new Error('Invalid API response format');
    }

    console.log('Successfully fetched from API:', data.transactions.length, 'transactions');
    return data.transactions.map(transformTransaction).filter(Boolean) as Transaction[];
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const fetchFromLocal = async (): Promise<Transaction[]> => {
  try {    
    const response = await fetch('/db/transactions.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`Local file error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.transactions || !Array.isArray(data.transactions)) {
      throw new Error('Invalid local file format');
    }

    console.log('Successfully fetched from local:', data.transactions.length, 'transactions');
    return data.transactions.map(transformTransaction).filter(Boolean) as Transaction[];
  } catch (error) {
    console.error('Local fallback failed:', error);
    throw error;
  }
};

const transformTransaction = (item: RawTransaction): Transaction | null => {
  if (!item) return null;

  return {
    id: String(item.id || ''),
    amount: Number(item.amount || 0),
    card: String(item.card || ''),
    installments: Number(item.installments || 1),
    createdAt: String(item.createdAt || new Date().toISOString()),
    updatedAt: String(item.updatedAt || new Date().toISOString()),
    paymentMethod: item.paymentMethod || ''
  };
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    return await fetchFromAPI();
  } catch (apiError) {
    console.warn('API failed, trying local fallback...', apiError instanceof Error ? apiError.message : apiError);
    
    try {
      return await fetchFromLocal();
    } catch (localError) {
      console.error('Both API and local fallback failed');
      console.error('API Error:', apiError);
      console.error('Local Error:', localError);
      
      throw new Error('No se pudieron cargar las transacciones. Verifica tu conexión a internet.');
    }
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
