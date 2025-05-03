import {
  ChevronDown20Regular as ChevronDownIcon,
  Dismiss16Filled,
  TextPeriodAsterisk20Filled,
  MoreVertical20Filled as VerticalDotsIcon,
  WalletCreditCard16Filled,
} from '@fluentui/react-icons';
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';

import Card from '@/components/Card/Card';
import RecordPaymentModal from './components/RecordPaymentModal/RecordPaymentModal';

// import {recordManualPaymentById} from '../../actions/recordManualPayment';
// import {
//   cancelPayment,
//   cancelPaymentExemption,
//   exemptPayment,
// } from '../../actions/todo_editManualPayment';

import {
  cancelPayment,
  cancelPaymentExemption,
  recordManualPaymentById,
} from '@/app/dashboard/athletes/[id]/actions/updateAthletePayments';

import styles from './PaymentsTable.module.css';

const columns = [
  {name: 'NALEŻNOŚĆ', uid: 'amount_due', sortable: true},
  {name: 'MIESIĄC', uid: 'month', sortable: true},
  {name: 'ROK', uid: 'year', sortable: true},
  {name: 'SPOSÓB PŁATNOŚCI', uid: 'payment_method', sortable: true},
  {name: 'DATA WPŁATY', uid: 'payment_date', sortable: true},
  {name: 'STATUS', uid: 'status', sortable: true},
  {name: '', uid: 'actions'},
];

const statusColorMap = {
  paid: 'success',
  pending: 'danger',
};

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const statusOptions = [
  {name: 'Opłacone', uid: 'paid'},
  {name: 'Nieopłacone', uid: 'pending'},
  {name: 'Zwolniony', uid: 'exempt'},
];

const paymentMethodOptions = [
  {name: 'Gotówka', uid: 'cash'},
  {name: 'Przelew', uid: 'bank_transfer'},
  {name: 'Karta', uid: 'card'},
];

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

const INITIAL_VISIBLE_COLUMNS = [
  'month',
  'year',
  'amount_due',
  'payment_method',
  'payment_date',
  'status',
  'actions',
];

export default function PaymentsTable({
  className = '',
  isLoading = false,
  payments = [],
  refetchPayments,
}) {
  return (
    <Card title="Historia wpłat" className={`${styles.cardContainer} ${className}`}>
      <TableComponent isLoading={isLoading} payments={payments} refetchPayments={refetchPayments} />
    </Card>
  );
}

const AvaratName = ({imgSrc, name}) => (
  <div className={styles.avatarNameContainer}>
    <Avatar
      src={imgSrc}
      alt={name}
      name={name}
      size="sm"
      className={styles.avatar}
      classNames={{
        base: styles.avatarBase,
      }}
    />
    <span className={styles.name}>{name}</span>
  </div>
);

const TableComponent = ({isLoading = false, payments = [], refetchPayments}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [groupsFilter, setGroupsFilter] = React.useState('all');
  // const [monthFilter, setMonthFilter] = React.useState('all');
  // Current month as default
  const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript
  const currentYear = new Date().getFullYear();
  const [monthFilter, setMonthFilter] = React.useState('all');
  const [yearFilter, setYearFilter] = React.useState('all');

  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'month',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPayments = [...payments];

    if (hasSearchFilter) {
      filteredPayments = filteredPayments.filter(payment =>
        payment.athlete.full_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredPayments = filteredPayments.filter(payment =>
        Array.from(statusFilter).includes(payment.status)
      );
    }

    if (monthFilter !== 'all' && Array.from(monthFilter).length !== monthOptions.length) {
      filteredPayments = filteredPayments.filter(payment =>
        Array.from(monthFilter).includes(payment.month.toString())
      );
    }

    if (yearFilter !== 'all' && Array.from(yearFilter).length !== yearFilter.length) {
      filteredPayments = filteredPayments.filter(payment =>
        Array.from(yearFilter).includes(payment.year.toString())
      );
    }

    // if (groupsFilter !== 'all' && Array.from(groupsFilter).length !== groupsOptions.length) {
    //   filteredUsers = filteredUsers.filter(user => {
    //     const userGroups = user.groups.map(group => group.uid);
    //     return Array.from(groupsFilter).some(group => userGroups.includes(group));
    //   });
    // }

    return filteredPayments;
  }, [payments, filterValue, statusFilter, groupsFilter, monthFilter, yearFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // New sorting logic to sort first by year and then by month
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const yearA = a.year;
      const yearB = b.year;
      const monthA = a.month;
      const monthB = b.month;
      const cmp =
        yearA < yearB ? -1 : yearA > yearB ? 1 : monthA < monthB ? -1 : monthA > monthB ? 1 : 0;
      // return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      return -cmp;
    });
  }, [items]);

  const handleCancelPayment = async id => {
    try {
      const response = await cancelPayment({paymentId: id});
      if (response.success) {
        refetchPayments();
      } else {
        console.error('Failed to cancel payment:', response.message);
      }
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  };

  const handleExemptPayment = async id => {
    try {
      const response = await exemptPayment({paymentId: id});
      if (response.success) {
        refetchPayments();
      } else {
        console.error('Failed to exempt payment:', response.message);
      }
    } catch (error) {
      console.error('Error exempting payment:', error);
    }
  };

  const handleRecordPayment = async id => {
    try {
      const response = await recordManualPaymentById({paymentId: id});
      if (response.success) {
        refetchPayments();
      } else {
        console.error('Failed to record payment:', response.message);
      }
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  const handleCancelExemption = async id => {
    try {
      const response = await cancelPaymentExemption({paymentId: id});
      if (response.success) {
        console.log('Payment exemption cancelled successfully');
        refetchPayments();
      } else {
        console.error('Failed to cancel payment exemption:', response.message);
      }
    } catch (error) {
      console.error('Error cancelling payment exemption:', error);
    }
  };

  const renderCell = React.useCallback((payment, columnKey) => {
    const cellValue = payment[columnKey];

    switch (columnKey) {
      case 'name':
        return <AvaratName id={payment.id} name={payment.athlete.full_name} />;
      case 'groups':
        return (
          <ul className={styles.groupsList}>
            {payment.athlete.groups.map(group => (
              <li key={group.id} className={styles.group}>
                <Chip
                  variant="dot"
                  classNames={{base: styles.chipBase, dot: styles.chipDot}}
                  style={{'--dot-color': group.color}}
                >
                  {group.name}
                </Chip>
              </li>
            ))}
          </ul>
        );
      case 'amount_due':
        return <span>{payment.amount_due} PLN</span>;
      case 'payment_method':
        // return <span>{payment.payment_method || ''}</span>;
        return (
          <span>
            {paymentMethodOptions.find(method => method.uid === payment.payment_method)?.name ||
              '-'}
          </span>
        );
      case 'month':
        return (
          <span>{monthOptions.find(month => month.uid === payment.month.toString())?.name}</span>
        );
      case 'payment_date':
        return (
          <span>
            {payment.payment_date
              ? new Date(payment.payment_date).toLocaleDateString('pl-PL')
              : '-'}
          </span>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[payment.status]}
            size="sm"
            variant="flat"
          >
            {statusOptions.find(status => status.uid === payment.status)?.name || ''}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gnap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {payment.status == 'paid' && (
                  <DropdownItem
                    startContent={<Dismiss16Filled />}
                    onPress={() => handleCancelPayment(payment.id)}
                  >
                    Anuluj wpłatę
                  </DropdownItem>
                )}
                {payment.status == 'pending' && (
                  <>
                    <DropdownItem
                      startContent={<WalletCreditCard16Filled />}
                      onPress={() => handleRecordPayment(payment.id)}
                    >
                      Zaksięguj wpłatę
                    </DropdownItem>
                    <DropdownItem
                      startContent={<TextPeriodAsterisk20Filled />}
                      onPress={() => handleExemptPayment(payment.id)}
                    >
                      Zwolnij z płatności w tym miesiącu
                    </DropdownItem>
                  </>
                )}
                {payment.status == 'exempt' && (
                  <DropdownItem
                    startContent={<TextPeriodAsterisk20Filled />}
                    onPress={() => handleCancelExemption(payment.id)}
                  >
                    Anuluj zwolnienie z płatności
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(e => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback(value => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <RecordPaymentModal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          refetchPayments={refetchPayments}
        />
        <div className="flex justify-end gap-3 items-end">
          <div className="flex gap-3">
            {/* MONTH FILTER DROPDOWN */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  {monthFilter == 'all' || Array.from(monthFilter).length === monthOptions.length
                    ? 'Miesiąc'
                    : Array.from(monthFilter).length === 1
                    ? monthOptions.find(month => month.uid === Array.from(monthFilter)[0])?.name ||
                      'Miesiąc'
                    : `Miesiąc (${Array.from(monthFilter).length})`}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Month filter"
                closeOnSelect={false}
                selectedKeys={monthFilter}
                selectionMode="multiple"
                onSelectionChange={setMonthFilter}
              >
                {monthOptions.map(month => (
                  <DropdownItem key={month.uid} className="capitalize">
                    {capitalize(month.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* YEAR FILTER DROPDOWN */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  {yearFilter == 'all' || Array.from(yearFilter).length === yearFilter.length
                    ? 'Rok'
                    : Array.from(yearFilter).length === 1
                    ? yearFilter
                    : `Rok (${Array.from(yearFilter).length})`}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Year filter"
                closeOnSelect={false}
                selectedKeys={yearFilter}
                selectionMode="multiple"
                onSelectionChange={setYearFilter}
              >
                {Array.from(new Set(payments.map(payment => payment.year))).map(year => (
                  <DropdownItem key={year} className="capitalize">
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* STATUS FILTER DROPDOWN */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  {/* Status */}
                  {statusFilter != 'all' && Array.from(statusFilter).length === 1
                    ? statusOptions.find(status => status.uid === Array.from(statusFilter)[0])
                        ?.name || 'Status'
                    : 'Status'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status filter"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map(status => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <RecordPaymentButton onClick={onModalOpen} /> */}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    groupsFilter,
    monthFilter,
    yearFilter,
    visibleColumns,
    onRowsPerPageChange,
    payments,
    onSearchChange,
    hasSearchFilter,
    onModalOpen,
    isModalOpen,
    onModalOpenChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Zaznaczono wszystkie'
            : `Zaznaczono ${selectedKeys.size} z ${filteredItems.length}`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <label className="flex items-center text-default-400 text-small">
            Wyświetlaj:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label=""
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      className={styles.table}
      classNames={{
        wrapper: `max-h-[380px] ${styles.tableWrapper}`,
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            // allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={isLoading ? <Spinner /> : 'Brak danych.'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
