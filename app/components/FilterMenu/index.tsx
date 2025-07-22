import { Container } from '../Container';
import { Title } from '../Title';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';
import { RichText } from '../RichText';
import { DatePicker } from '../DatePicker';
import { InputButton } from '../InputButton';
import { RangeSlider } from '../RangeSlider';
import { 
  CARDS, 
  PAYMENT_METHODS, 
  INSTALLMENTS, 
  ALL_OPTION,
  type Card,
  type PaymentMethod,
  type Installment 
} from '../../constants';
import { useState } from 'react';
import type { FilterMenuProps, FilterState, ExpandedSections, FilterSection } from './types.ts';

export function FilterMenu({ isOpen, onClose, onApplyFilters, onClearFilters }: FilterMenuProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { startDate: null, endDate: null },
    cards: [],
    installments: [],
    amount: { min: 10, max: 2000 },
    paymentMethods: []
  });

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    date: false,
    cards: false,
    installments: false,
    amount: false,
    paymentMethods: false
  });

  const toggleSection = (section: FilterSection) => {
    setExpandedSections((prev: ExpandedSections) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: { startDate: null, endDate: null },
      cards: [],
      installments: [],
      amount: { min: 10, max: 2000 },
      paymentMethods: []
    });
    setExpandedSections({
      date: false,
      cards: false,
      installments: false,
      amount: false,
      paymentMethods: false
    });
    
    // Immediately clear filters in parent component
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = () => {
    return (
      (filters.dateRange.startDate && filters.dateRange.endDate) ||
      filters.cards.length > 0 ||
      filters.installments.length > 0 ||
      (filters.amount.min !== 10 || filters.amount.max !== 2000) ||
      filters.paymentMethods.length > 0
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <Container className="fixed right-0 top-[56px] h-screen w-80 bg-white z-50 shadow-xl overflow-y-auto pb-8">
        <Container className="p-4 grid grid-rows-[auto_1fr_auto]">
          <Container>
            <Container flex justify="between" align="center" className="mb-6">
              <Container flex align="center" gap="2">
                <Button icon="chevron-left" variant="ghost" size="sm" onClick={onClose} />
                <Title level={3} content="Filtros" />
              </Container>
            </Container>

            <Container flex justify="between" align="center" className="mb-6">
              <Title level={3} content="Todos los filtros" />
              <Container 
                noBaseStyles
                onClick={handleClearFilters}
                className="cursor-pointer"
              >
                <RichText
                  content="Limpiar"
                  color="primary"
                  className="cursor-pointer"
                />
              </Container>
            </Container>
          </Container>

          <Container className="overflow-y-auto">
            <Container className="mb-6">
              <Container flex justify="between" align="center" className="mb-4">
                <RichText color="dark" icon="calendar" content="Fecha" />
                <ToggleSwitch
                  checked={expandedSections.date}
                  onChange={() => toggleSection('date')}
                  className="!py-1"
                />
              </Container>
              {expandedSections.date && (
                <DatePicker
                  mode="always-open"
                  value={filters.dateRange}
                  onChange={(range) => setFilters(prev => ({ ...prev, dateRange: range }))}
                />
              )}
            </Container>

            <Container className="mb-6">
              <Container flex justify="between" align="center" className="mb-4">
                <RichText color="dark" icon="card-alt" content="Tarjeta" />
                <ToggleSwitch
                  checked={expandedSections.cards}
                  onChange={() => toggleSection('cards')}
                  className="!py-1"
                />
              </Container>
              {expandedSections.cards && (
                <Container className="pl-2 overflow-x-auto scrollbar-hide">
                  <Container flex className="gap-2 flex-nowrap">
                    {Object.entries(CARDS).map(([id, label]) => (
                        <InputButton
                          key={id}
                          label={label}
                          checked={id === ALL_OPTION ? filters.cards.length === 0 : filters.cards.includes(id as Card)}
                          onChange={() => {
                            if (id === ALL_OPTION) {
                              setFilters(prev => ({
                                ...prev,
                                cards: []
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                cards: filters.cards.includes(id as Card)
                                  ? prev.cards.filter(c => c !== id)
                                  : [...prev.cards, id as Card]
                              }));
                            }
                          }}
                          className="flex-shrink-0"
                        />
                    ))}
                  </Container>
                </Container>
              )}
            </Container>

            <Container className="mb-6">
              <Container flex justify="between" align="center" className="mb-4">
                <RichText color="dark" icon="calendar-bill" content="Cuotas" />
                <ToggleSwitch
                  checked={expandedSections.installments}
                  onChange={() => toggleSection('installments')}
                  className="!py-1"
                />
              </Container>
              {expandedSections.installments && (
                <Container className="pl-2 overflow-x-auto scrollbar-hide">
                  <Container flex className="gap-2 flex-nowrap">
                    {[ALL_OPTION, ...INSTALLMENTS].map(installment => (
                        <InputButton
                          key={installment}
                          label={installment === ALL_OPTION ? 'Todas' : installment.toString()}
                          checked={installment === ALL_OPTION ? filters.installments.length === 0 : filters.installments.includes(installment as Installment)}
                          onChange={() => {
                            if (installment === ALL_OPTION) {
                              setFilters(prev => ({
                                ...prev,
                                installments: []
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                installments: filters.installments.includes(installment as Installment)
                                  ? prev.installments.filter(i => i !== installment)
                                  : [...prev.installments, installment as Installment]
                              }));
                            }
                          }}
                          className="flex-shrink-0"
                        />
                    ))}
                  </Container>
                </Container>
              )}
            </Container>

            <Container className="mb-6">
              <Container flex justify="between" align="center" className="mb-4">
                <RichText color="dark" icon="commission" content="Monto" />
                <ToggleSwitch
                  checked={expandedSections.amount}
                  onChange={() => toggleSection('amount')}
                  className="!py-1"
                />
              </Container>
              {expandedSections.amount && (
                <Container flex direction="col" className="px-4 my-8">
                  <RangeSlider
                    initialValues={[filters.amount.min, filters.amount.max]}
                    min={10}
                    max={2000}
                    step={10}
                    showValues
                    labels={{
                      minLabel: "Mínimo",
                      maxLabel: "Máximo",
                      prefix: "$"
                    }}
                    onChange={(values: [number, number]) => setFilters(prev => ({
                      ...prev,
                      amount: { min: values[0], max: values[1] }
                    })
                  )}
                  />
                </Container>
              )}
            </Container>

            <Container className="mb-6">
              <Container flex justify="between" align="center" className="mb-4">
                <RichText color="dark" icon="categories" content="Método de cobro" />
                <ToggleSwitch
                  checked={expandedSections.paymentMethods}
                  onChange={() => toggleSection('paymentMethods')}
                  className="!py-1"
                />
              </Container>
              {expandedSections.paymentMethods && (
                <Container className="pl-2 overflow-x-auto scrollbar-hide">
                  <Container flex className="gap-2 flex-nowrap">
                    {Object.entries(PAYMENT_METHODS).map(([id, label]) => (
                        <InputButton
                          key={id}
                          label={label}
                          checked={id === ALL_OPTION ? filters.paymentMethods.length === 0 : filters.paymentMethods.includes(id as PaymentMethod)}
                          onChange={() => {
                            if (id === ALL_OPTION) {
                              setFilters(prev => ({
                                ...prev,
                                paymentMethods: []
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                paymentMethods: filters.paymentMethods.includes(id as PaymentMethod)
                                  ? prev.paymentMethods.filter(m => m !== id)
                                  : [...prev.paymentMethods, id as PaymentMethod]
                              }));
                            }
                          }}
                          className="flex-shrink-0"
                        />
                    ))}
                  </Container>
                </Container>
              )}
            </Container>
            <Container className="my-6">
              <Button
                text="Aplicar Filtros"
                variant="primary"
                className="w-full"
                disabled={!hasActiveFilters()}
                onClick={() => onApplyFilters(filters)}
              />
            </Container>
          </Container>

        </Container>
      </Container>
    </>
  );       
}
