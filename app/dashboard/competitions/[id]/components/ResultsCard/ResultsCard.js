import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
// import {ChevronDownIcon} from './ChevronDownIcon';
import {
  ChevronDown20Regular as ChevronDownIcon,
  Dismiss16Filled,
  Search16Filled as SearchIcon,
  TextPeriodAsterisk20Regular,
  MoreVertical20Filled as VerticalDotsIcon,
  WalletCreditCard16Filled,
} from '@fluentui/react-icons';
import {ageCategoryOptions, columns, formulaOptions, groupsOptions, users} from './data';

import Card from '@/components/Card/Card';
import AvaratName from './components/AvatarName';
import RecordPaymentModal from './components/RecordPaymentModal/RecordPaymentModal';

import bronzeMedalIcon from './bronze-medal.svg';
import goldMedalIcon from './gold-medal.svg';
import silverMedalIcon from './silver-medal.svg';

import Image from 'next/image';
import styles from './ResultsCard.module.css';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'age_category',
  'formula',
  'weight_or_height_category',
  'result',
  // 'groups',
  // 'actions',
];

const ResultCell = ({result}) => {
  const getResultComponent = result => {
    if (result === 'gold')
      return (
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={goldMedalIcon} alt="gold medal" width={20} height={20} />
        </div>
      );
    if (result === 'silver')
      return (
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={silverMedalIcon} alt="silver` medal" width={20} height={20} />
        </div>
      );
    if (result === 'bronze')
      return (
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={bronzeMedalIcon} alt="bronze medal" width={20} height={20} />
        </div>
      );
    return (
      <div
        style={{
          width: 24,
          height: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        -
      </div>
    );
  };

  const [selectedMedal, setSelectedMedal] = React.useState(result);

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <div className={styles.medalContainer}>
          {getResultComponent(selectedMedal)}
          <div className={styles.medalChevronContainer}>
            <ChevronDownIcon className={styles.medalChevronIcon} />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect
        selectedKeys={selectedMedal}
        selectionMode="single"
        onAction={medal => {
          setSelectedMedal(medal);
        }}
      >
        <DropdownItem key={'none'} className="capitalize">
          Brak medalu
        </DropdownItem>
        <DropdownItem
          key={'gold'}
          className="capitalize"
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          endContent={getResultComponent('gold')}
        >
          Złoto
        </DropdownItem>
        <DropdownItem
          key={'silver'}
          className="capitalize"
          endContent={getResultComponent('silver')}
        >
          Srebro
        </DropdownItem>
        <DropdownItem
          key={'bronze'}
          className="capitalize"
          endContent={getResultComponent('bronze')}
        >
          Brąz
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default function ResultsCard({className = ''}) {
  return (
    <Card title="Wyniki" className={`${styles.cardContainer} ${className}`}>
      <ResultsTable />
    </Card>
  );
}

const ResultsTable = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const [isEditMode, setIsEditMode] = React.useState(false);

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [formulaFilter, setFormulaFilter] = React.useState('all');
  const [ageCategoryFilter, setAgeCategoryFilter] = React.useState('all');

  const [groupsFilter, setGroupsFilter] = React.useState('all');

  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (formulaFilter !== 'all' && Array.from(formulaFilter).length !== formulaOptions.length) {
      filteredUsers = filteredUsers.filter(user =>
        Array.from(formulaFilter).includes(user.formula)
      );
    }

    if (
      ageCategoryFilter !== 'all' &&
      Array.from(ageCategoryFilter).length !== ageCategoryOptions.length
    ) {
      filteredUsers = filteredUsers.filter(user =>
        Array.from(ageCategoryFilter).includes(user.age_category)
      );
    }

    if (groupsFilter !== 'all' && Array.from(groupsFilter).length !== groupsOptions.length) {
      filteredUsers = filteredUsers.filter(user => {
        const userGroups = user.groups.map(group => group.uid);
        return Array.from(groupsFilter).some(group => userGroups.includes(group));
      });
    }

    return filteredUsers;
  }, [users, filterValue, groupsFilter, formulaFilter, ageCategoryFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'name':
          return <AvaratName id={user.id} imgSrc={user.avatar} name={user.name} />;
        case 'groups':
          return (
            <ul className={styles.groupsList}>
              {user.groups.map(group => (
                <li key={group.uid} className={styles.group}>
                  <Chip
                    variant="dot"
                    classNames={{base: styles.chipBase, dot: styles.chipDot}}
                    style={{'--dot-color': groupsOptions.find(g => g.uid === group.uid).color}}
                  >
                    {group.name}
                  </Chip>
                </li>
              ))}
            </ul>
          );
        case 'result':
          return <ResultCell result={user.result} />;

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
                  <DropdownItem startContent={<WalletCreditCard16Filled />}>
                    Zaksięguj wpłatę
                  </DropdownItem>
                  <DropdownItem startContent={<Dismiss16Filled />}>
                    Anuluj wpłatę wpłatę
                  </DropdownItem>
                  <DropdownItem startContent={<TextPeriodAsterisk20Regular />}>
                    Zwolnij z płatności w tym miesiącu
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isEditMode, setIsEditMode]
  );

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
        <RecordPaymentModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Wyszukaj zawodnika"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* MONTH FILTER DROPDOWN */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Miesiąc
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
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(month.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* GROUPS FILTER DROPDOWN */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Grupy
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Groups filter"
                closeOnSelect={false}
                selectedKeys={groupsFilter}
                selectionMode="multiple"
                onSelectionChange={setGroupsFilter}
              >
                {groupsOptions.map(group => (
                  <DropdownItem key={group.uid} className="capitalize">
                    {capitalize(group.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* STATUS FILTER DROPDOWN
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
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
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Kat. wiekowa
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status filter"
                closeOnSelect={false}
                selectedKeys={ageCategoryFilter}
                selectionMode="multiple"
                onSelectionChange={setAgeCategoryFilter}
              >
                {ageCategoryOptions.map(ageCategory => (
                  <DropdownItem key={ageCategory.uid} className="capitalize">
                    {capitalize(ageCategory.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Formuła
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status filter"
                closeOnSelect={false}
                selectedKeys={formulaFilter}
                selectionMode="multiple"
                onSelectionChange={setFormulaFilter}
              >
                {formulaOptions.map(formula => (
                  <DropdownItem key={formula.uid} className="capitalize">
                    {capitalize(formula.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>{' '}
            {/* <RecordPaymentButton onClick={onModalOpen} /> */}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    groupsFilter,
    formulaFilter,
    ageCategoryFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
    onModalOpen,
    isModalOpen,
    onModalOpenChange,
    isEditMode,
    setIsEditMode,
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
        wrapper: `max-h-[460px] ${styles.tableWrapper}`,
      }}
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      // key={`results-table-${isEditMode}`}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'Nie znaleziono zawodników'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
