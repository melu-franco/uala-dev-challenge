import type { DateRange } from '~/components/DatePicker/types';
import type { Transaction } from '~/types/transactions';
import { PAYMENT_METHODS } from '~/constants';

export const adjustEndDateToEndOfDay = (date: Date): Date => {
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
};

export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  dateRange: DateRange
): Transaction[] => {
  if (!dateRange.startDate || !dateRange.endDate) {
    return transactions;
  }

  const endDate = adjustEndDateToEndOfDay(dateRange.endDate);

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= dateRange.startDate! && transactionDate <= endDate;
  });
};

export const generateCSV = (transactions: Transaction[]): string => {
  const headers = ['Fecha', 'Monto', 'Método de pago'];
  const rows = transactions.map(t => [
    new Date(t.createdAt).toLocaleDateString(),
    t.amount.toString(),
    PAYMENT_METHODS[t.paymentMethod as keyof typeof PAYMENT_METHODS]
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateCSVFilename = (dateRange: DateRange): string => {
  if (!dateRange.startDate || !dateRange.endDate) {
    return 'transacciones.csv';
  }

  const startDate = dateRange.startDate.toISOString().split('T')[0];
  const endDate = dateRange.endDate.toISOString().split('T')[0];
  return `transacciones_${startDate}_${endDate}.csv`;
};

export const downloadTransactionsCSV = (
  transactions: Transaction[],
  dateRange: DateRange
): void => {
  const filteredTransactions = filterTransactionsByDateRange(transactions, dateRange);
  
  if (filteredTransactions.length === 0) {
    throw new Error("No hay movimientos en las fechas seleccionadas para descargar");
  }
  
  const csvContent = generateCSV(filteredTransactions);
  const filename = generateCSVFilename(dateRange);
  downloadCSV(csvContent, filename);
};
