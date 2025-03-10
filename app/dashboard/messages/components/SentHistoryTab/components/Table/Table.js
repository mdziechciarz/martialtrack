import Card from '@/components/Card/Card';
import {
  ChevronDown20Regular as ChevronDownIcon,
  Search16Filled as SearchIcon,
  MoreVertical20Filled as VerticalDotsIcon,
} from '@fluentui/react-icons';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';
// import {sentMessages} from './data';

import styles from './Table.module.css';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const columns = [
  {name: 'ID', uid: 'id', sortable: true},
  {name: 'DATA', uid: 'date', sortable: true},
  {name: 'TEMAT', uid: 'subject'},
  {name: 'TREŚĆ', uid: 'content'},
  {name: 'ODBIORCY', uid: 'message_recipients'},
  {name: '', uid: 'actions'},
];

// const INITIAL_VISIBLE_COLUMNS = ['date', 'message_recipients', 'subject', 'content', 'actions'];
const INITIAL_VISIBLE_COLUMNS = localStorage.getItem('sentHistoryTab_visibleColumns')
  ? JSON.parse(localStorage.getItem('sentHistoryTab_visibleColumns'))
  : ['date', 'message_recipients', 'subject', 'content', 'actions'];

const AvaratName = ({imgSrc, name}) => (
  <div className={styles.avatarNameContainer}>
    {/* <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} /> */}
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

export default function SentMessagesTable({messages, isLoading, handleRemoveMessage}) {
  return (
    <Card title="Wysłane wiadomości" className={styles.cardContainer}>
      <MessagesTable
        messages={messages}
        isLoading={isLoading}
        handleRemoveMessage={handleRemoveMessage}
      />
    </Card>
  );
}

const MessagesTable = ({messages: sentMessages = [], isLoading = false, handleRemoveMessage}) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const handleChangeVisibleColumns = columns => {
    localStorage.setItem('sentHistoryTab_visibleColumns', JSON.stringify(Array.from(columns)));
    setVisibleColumns(columns);
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredMessages = [...sentMessages];

    if (hasSearchFilter) {
      filteredMessages = filteredMessages.filter(message =>
        message.recipients.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredMessages;
  }, [sentMessages, filterValue]);

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

  const renderCell = React.useCallback((message, columnKey) => {
    const cellValue = message[columnKey];

    switch (columnKey) {
      case 'message_recipients': {
        return (
          <ul className={styles.recipientsContainer}>
            {cellValue.map(recipient => {
              if (recipient.coach)
                return <AvaratName key={recipient.coach.id} name={recipient.coach.full_name} />;
              else if (recipient.athlete)
                return <AvaratName key={recipient.athlete.id} name={recipient.athlete.full_name} />;
            })}
          </ul>
        );
      }
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
                <DropdownItem onPress={() => handleRemoveMessage(message.id)}>Delete</DropdownItem>
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Wyszukaj odbiorcę..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={handleChangeVisibleColumns}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Łącznie {sentMessages.length} zamówień
          </span>
          <label className="flex items-center text-default-400 text-small">
            Wyświetlaj:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    sentMessages.length,
    onSearchChange,
    hasSearchFilter,
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
        wrapper: `${styles.tableWrapper}`,
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
      <TableBody emptyContent={isLoading ? <Spinner /> : 'Brak wiadomości.'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
