import {ArrowDownload20Filled, ChevronDown16Filled} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Spinner,
} from '@nextui-org/react';

import GroupPaymentsCard from './components/GroupPaymentsCard';

import {useState} from 'react';
import styles from './GroupsGrid.module.css';

const monthOptions = [
  {name: 'Styczeń', uid: '1'},
  {name: 'Luty', uid: '2'},
  {name: 'Marzec', uid: '3'},
  {name: 'Kwiecień', uid: '4'},
  {name: 'Maj', uid: '5'},
  {name: 'Czerwiec', uid: '6'},
  {name: 'Lipiec', uid: '7'},
  {name: 'Sierpień', uid: '8'},
  {name: 'Wrzesień', uid: '9'},
  {name: 'Październik', uid: '10'},
  {name: 'Listopad', uid: '11'},
  {name: 'Grudzień', uid: '12'},
];

const yearOptions = [
  {name: '2022', uid: '2022'},
  {name: '2023', uid: '2023'},
  {name: '2024', uid: '2024'},
  {name: '2025', uid: '2025'},
];

const GroupsGrid = ({isLoading = false, paymentsByGroup = [], refetchPayments}) => {
  const currentMonth = parseInt(new Date().getMonth() + 1);
  const currentYear = parseInt(new Date().getFullYear());

  const [monthFilter, setMonthFilter] = useState(new Set([currentMonth.toString()]));
  const [yearFilter, setYearFilter] = useState(new Set([currentYear.toString()]));

  const filteredPayments = paymentsByGroup.map(group => {
    const filteredPayments = group.membership_payments.filter(payment => {
      return monthFilter.has(payment.month.toString()) && yearFilter.has(payment.year.toString());
    });

    return {
      ...group,
      membership_payments: filteredPayments,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <div className={styles.filterButtons}>
          <Select
            label="Miesiąc"
            placeholder="Wybierz miesiąc"
            selectedKeys={monthFilter}
            variant="flat"
            size="sm"
            classNames={{
              trigger: styles.selectTrigger,
            }}
            onSelectionChange={setMonthFilter}
            disallowEmptySelection
          >
            {monthOptions.map(month => (
              <SelectItem key={month.uid}>{month.name}</SelectItem>
            ))}
          </Select>
          <Select
            label="Rok"
            placeholder="Wybierz rok"
            variant="flat"
            size="sm"
            classNames={{
              trigger: styles.selectTrigger,
            }}
            selectedKeys={yearFilter}
            onSelectionChange={setYearFilter}
            disallowEmptySelection
          >
            {yearOptions.map(year => (
              <SelectItem key={year.uid}>{year.name}</SelectItem>
            ))}
          </Select>
        </div>
        <Buttons />
      </div>
      <div className={styles.grid}>
        {isLoading ? (
          <Spinner />
        ) : (
          filteredPayments.map(group => (
            <GroupPaymentsCard
              key={group.id}
              groupName={group.name}
              color={group.color}
              payers={group.membership_payments.map(payment => ({
                paymentId: payment.id,
                name: payment.athlete.full_name,
                amount: payment.amount_due,
                // isPaid: payment.status === 'paid',
                status: payment.status,
              }))}
              amountPaid={group.membership_payments.reduce((acc, payment) => {
                return acc + (payment.status === 'paid' ? payment.amount_due : 0);
              }, 0)}
              amountToBePaid={group.membership_payments.reduce((acc, payment) => {
                return (
                  acc + (['paid', 'pending'].includes(payment.status) ? payment.amount_due : 0)
                );
              }, 0)}
              paidCount={
                group.membership_payments.filter(payment => payment.status === 'paid').length
              }
              toBePaidCount={
                group.membership_payments.filter(payment =>
                  ['paid', 'pending'].includes(payment.status)
                ).length
              }
              refetchPayments={refetchPayments}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button startContent={<ArrowDownload20Filled />}>Pobierz raport</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDown16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1">Opcja 1</DropdownItem>
          <DropdownItem key="2">Opcja 2</DropdownItem>
          <DropdownItem key="3">Opcja 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default GroupsGrid;
