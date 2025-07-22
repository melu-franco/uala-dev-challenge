import { useState, useEffect, useMemo } from 'react';
import type { Transaction } from '../types/transactions';
import type { TimeFilter } from '../constants';
import type { DateRange } from '../components/DatePicker/types';
import { fetchTransactions } from '../services/transactionService';

interface UseTransactionsReturn {
  transactions: Transaction[];
  error: string | null;
  loading: boolean;
  total: number;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  filteredTransactions: Transaction[];
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  filters: {
    cards: string[];
    installments: number[];
    amount: { min: number; max: number };
    paymentMethods: string[];
  };
  setFilters: (filters: {
    cards: string[];
    installments: number[];
    amount: { min: number; max: number };
    paymentMethods: string[];
  }) => void;
  hasDateRangeFilter: boolean;
}

export function useTransactions(): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('daily');
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [filters, setFilters] = useState({
    cards: [] as string[],
    installments: [] as number[],
    amount: { min: 10, max: 2000 },
    paymentMethods: [] as string[]
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las transacciones');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    const hasDateRangeFilter = dateRange.startDate && dateRange.endDate;

    if (!hasDateRangeFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      
      switch (timeFilter) {
        case 'daily':
          filtered = filtered.filter(transaction => {
            const date = new Date(transaction.createdAt);
            return date >= today && date <= endOfDay;
          });
          break;
        case 'weekly':
          const weekStart = new Date(today);
          const day = weekStart.getDay();
          const diff = weekStart.getDate() - (day === 0 ? 6 : day - 1);
          weekStart.setDate(diff);
          filtered = filtered.filter(transaction => {
            const date = new Date(transaction.createdAt);
            return date >= weekStart && date <= endOfDay;
          });
          break;
        case 'monthly':
          const monthStart = new Date();
          monthStart.setMonth(monthStart.getMonth() - 1);
          filtered = filtered.filter(transaction => {
            const date = new Date(transaction.createdAt);
            return date >= monthStart && date <= endOfDay;
          });
          break;
      }
    }

    if (hasDateRangeFilter) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= dateRange.startDate! && transactionDate <= dateRange.endDate!;
      });
    }

    if (filters.cards.length > 0) {
      filtered = filtered.filter(transaction => 
        filters.cards.includes(transaction.card.toLowerCase())
      );
    }

    if (filters.installments.length > 0) {
      filtered = filtered.filter(transaction => 
        filters.installments.includes(transaction.installments)
      );
    }

    if (filters.paymentMethods.length > 0) {
      filtered = filtered.filter(transaction => 
        filters.paymentMethods.includes(transaction.paymentMethod)
      );
    }

    filtered = filtered.filter(transaction => 
      transaction.amount >= filters.amount.min && 
      transaction.amount <= filters.amount.max
    );

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered;
  }, [transactions, timeFilter, dateRange, filters]);

  const total = useMemo(() => 
    transactions.reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  return {
    transactions,
    error,
    loading,
    total,
    timeFilter,
    setTimeFilter,
    filteredTransactions,
    dateRange,
    setDateRange,
    filters,
    setFilters,
    hasDateRangeFilter: !!(dateRange.startDate && dateRange.endDate)
  };
}
