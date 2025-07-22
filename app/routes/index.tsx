import { useState } from 'react';
import { Container } from '~/components/Container';
import { Title } from '~/components/Title';
import { Button } from '~/components/Button';
import { RichText } from '~/components/RichText';
import { DatePicker } from '~/components/DatePicker';
import { FilterMenu } from '~/components/FilterMenu';
import { Currency } from '~/components/Currency';
import { Icon } from '~/components/Icon';
import { useTransactions } from '~/hooks/useTransactions';
import type { DateRange } from '~/components/DatePicker/types';
import { PAYMENT_METHODS, TIME_FILTERS, type TimeFilter } from '~/constants';
import { downloadTransactionsCSV } from '~/utils/transactionHelpers';
import { Snackbar } from '~/components/Snackbar';
import { Link } from '~/components/Link';

export default function Transactions() {
  const { 
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
    hasDateRangeFilter
  } = useTransactions();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [customDateRange, setCustomDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const handleDownloadDateChange = (range: DateRange) => {
    setDownloadDateRange(range);
  };

  const handleDownload = (range: DateRange) => {
    try {
      if (!range.startDate || !range.endDate) return;
      downloadTransactionsCSV(transactions, range);
      setIsDownloadOpen(false);
      setDownloadDateRange({ startDate: null, endDate: null });
    } catch (error) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Error al descargar');
      setIsSnackbarVisible(true);
      setIsDownloadOpen(false);
    }
  };

  const getFilteredTransactions = () => {
    let filtered = [...filteredTransactions];

    if (customDateRange.startDate && customDateRange.endDate) {
      const endDate = new Date(customDateRange.endDate!);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(transaction => {
        const date = new Date(transaction.createdAt);
        return date >= customDateRange.startDate! && date <= endDate;
      });
    }

    return filtered;
  };

  if (loading) {
    return (
      <Container maxWidth="4xl" padding="md" className="bg-background-light min-h-screen">
        <Container padding="lg" flex justify="center">
          Cargando...
        </Container>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="4xl" padding="md" className="bg-background-light min-h-screen">
        <Container className="text-center" padding="lg" flex direction="col" align="center" gap="4">
          <Icon className="mb-4" name="search-empty" size={72} />
          <RichText className="text-center" content="No hay resultados que mostrar. Podés probar usando los filtros." color="neutral" />
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="4xl" padding="md" className="bg-background-light min-h-screen">
        <Container padding="lg">
          <Title level={1} content="Tus cobros" className="mb-8" />
          <Container flex justify="center" className="mb-6">
            {(Object.entries(TIME_FILTERS) as [TimeFilter, string][]).map(([key, label]) => (
              <Button
                key={key}
                text={label}
                className={`transition-all duration-300 ease-in-out color-neutral ${
                  !hasDateRangeFilter && timeFilter === key 
                    ? 'font-bold relative after:content-"" after:block after:h-[8px] after:bg-primary after:w-[8px] after:rounded after:absolute after:top-[40px]' 
                    : 'font-light pt-4'
                } ${hasDateRangeFilter ? 'opacity-50 cursor-not-allowed' : ''}`}
                variant="ghost"
                onClick={() => !hasDateRangeFilter && setTimeFilter(key)}
              />
            ))}
          </Container>
          <Container flex direction="col" align="center">
            <Currency 
              amount={total} 
              showSign
              size="lg"
            />
            <Link className="p-6" icon="analyze" iconPosition="left" color="primary" to="/metrics">
              Ver métricas
            </Link>
          </Container>
        </Container>

        <Container>
          <Container flex justify="between" align="center" className="mb-8 flex-nowrap">
            <Title level={2} content="Historial de transacciones" />
            <Container flex gap="2" justify="end" noBaseStyles >
              <Button 
                icon="filter" 
                aria-label="Filtrar" 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFilterMenuOpen(true)} 
              />
              <div className="relative">
                <Button 
                  icon="download" 
                  aria-label="Descargar" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDownloadOpen(!isDownloadOpen)} 
                />
                {isDownloadOpen && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <DatePicker
                      mode="always-open"
                      value={downloadDateRange}
                      onChange={handleDownloadDateChange}
                      showActionButtons={true}
                      onClose={() => {
                        setDownloadDateRange({ startDate: null, endDate: null });
                        setIsDownloadOpen(false);
                      }}
                      onDownload={() => {
                        if (downloadDateRange.startDate && downloadDateRange.endDate) {
                          handleDownload(downloadDateRange);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </Container>
          </Container>

          {customDateRange.startDate && customDateRange.endDate && (
            <Container className="mb-4">
              <RichText 
                content={`Filtro adicional: del ${customDateRange.startDate.toLocaleDateString()} al ${customDateRange.endDate.toLocaleDateString()}`} 
                color="neutral" 
                size="sm"
              />
            </Container>
          )}

          {getFilteredTransactions().length === 0 ? (
            <Container className="text-center" padding="lg" flex direction="col" align="center" gap="4">
              <Icon className="mb-4" name="search-empty" size={48} />
              <RichText 
                content="No hay resultados que mostrar. Podés probar usando los filtros."
                color="neutral"
              />
            </Container>
          ) : (
            <Container className="divide-y divide-gray-200">
              {getFilteredTransactions().map((transaction) => (
                <Container key={transaction.id} padding="sm" className="hover:bg-gray-50">
                  <Container flex justify="between" align="center">
                    <Container flex>
                      <Icon name="category-stores" size={32} />
                      <Container flex direction="col" className="pl-2">
                        <RichText
                          content={PAYMENT_METHODS[transaction.paymentMethod as keyof typeof PAYMENT_METHODS]}
                          size="sm"
                          color="dark"
                          bold
                        />
                        <RichText
                          content="Venta"
                          size="sm"
                          color="gray"
                        />
                      </Container>
                    </Container>
                    <Container className="text-right">
                      <Currency 
                        amount={transaction.amount}
                        size="sm"
                        showSign
                        color="success"
                        bold
                      />
                      <RichText
                        content={new Date(transaction.createdAt).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit'
                        })}
                        size="sm"
                        color="gray"
                      />
                    </Container>
                  </Container>
                </Container>
              ))}
            </Container>
          )}
        </Container>
      </Container>
      <FilterMenu
        isOpen={isFilterMenuOpen}
        onClose={() => setIsFilterMenuOpen(false)}
        onApplyFilters={(filterData) => {
          setDateRange(filterData.dateRange);
          setFilters({
            cards: filterData.cards,
            installments: filterData.installments,
            amount: filterData.amount,
            paymentMethods: filterData.paymentMethods
          });
          setIsFilterMenuOpen(false);
        }}
        onClearFilters={() => {
          setDateRange({ startDate: null, endDate: null });
          setFilters({
            cards: [],
            installments: [],
            amount: { min: 10, max: 2000 },
            paymentMethods: []
          });
        }}
      />
      <Snackbar
        message={snackbarMessage}
        isVisible={isSnackbarVisible}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </>
  );
}
