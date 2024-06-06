'use client';

import {
  CheckboxChecked20Filled,
  ChevronDown20Regular as ChevronDownIcon,
  DismissCircle16Filled,
  PersonAdd20Filled,
  Search16Filled as SearchIcon,
  MoreVertical20Filled as VerticalDotsIcon,
} from '@fluentui/react-icons';
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
import Image from 'next/image';
import React from 'react';
import {columns, statusOptions, users} from './data';

import Card from '@/components/Card/Card';
import {useRouter} from 'next/navigation';
import AddMemberModal from './components/AddMemberModal/AddMemberModal';

import styles from './MembersCard.module.css';

const statusColorMap = {
  Zrealizowane: 'success',
  Nieopłacone: 'danger',
  Opłacone: 'warning',
};

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'birthdate', 'medical_checkups', 'actions'];

export default function MembersCard({className = ''}) {
  return (
    <Card title="Zawodnicy" className={`${styles.cardContainer} ${className}`}>
      <MembersTable />
    </Card>
  );
}

const AddNewMemberButton = ({onClick = () => {}}) => {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;

  if (isMobile) {
    return (
      <Button isIconOnly onClick={onClick} color="primary">
        <PersonAdd20Filled />
      </Button>
    );
  } else {
    return (
      <Button onClick={onClick} color="primary" endContent={<PersonAdd20Filled />}>
        Nowy zawodnik
      </Button>
    );
  }
};

const AvaratName = ({id, imgSrc, name}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/athletes/${id}`);
  };

  return (
    <div onClick={handleClick} className={styles.avatarNameContainer}>
      <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

const StatusChip = ({status}) => {
  const [selectedStatus, setSelectedStatus] = React.useState(status);

  console.log('selectedStatus', selectedStatus);

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <div className={styles.statusChipContainer}>
          <Chip
            className="capitalize"
            color={statusColorMap[selectedStatus]}
            size="sm"
            variant="flat"
          >
            {selectedStatus}
          </Chip>
          <div className={styles.statusChevronContainer}>
            <ChevronDownIcon className={styles.statusChevronIcon} />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect
        selectedKeys={selectedStatus}
        selectionMode="single"
        onAction={setSelectedStatus}
      >
        <DropdownItem key={'Zrealizowane'} className="capitalize">
          Zrealizowane
        </DropdownItem>
        <DropdownItem key={'Opłacone'} className="capitalize">
          Opłacone
        </DropdownItem>
        <DropdownItem key={'Nieopłacone'} className="capitalize">
          Nieopłacone
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const MembersTable = () => {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
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
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter(user => Array.from(statusFilter).includes(user.status));
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          // <User avatarProps={{src: user.avatar}} description={user.email} name={cellValue}>
          //   {user.email}
          // </User>
          <AvaratName id={user.id} imgSrc={user.avatar} name={user.name} />
        );
      case 'medical_checkups':
        return (
          <p className={styles.medicalCheckupsCell}>
            {cellValue}
            {cellValue < new Date().toISOString().split('T')[0] ? (
              <DismissCircle16Filled style={{color: '#FF5151'}} />
            ) : (
              <CheckboxChecked20Filled style={{color: '#7BD879'}} />
            )}
          </p>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case 'status':
        return (
          // <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
          //   {cellValue}
          // </Chip>
          <StatusChip status={cellValue} />
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
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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
        <AddMemberModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Kolumny
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddNewMemberButton onClick={onModalOpen} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Łącznie {users.length} zawodników</span>
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
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
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
          {/* <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button> */}
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
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
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
