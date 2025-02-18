import React, {useEffect, useState} from 'react';

import {
  ChevronDown20Regular as ChevronDownIcon,
  ReceiptAdd20Filled,
  Search16Filled as SearchIcon,
  MoreVertical20Filled as VerticalDotsIcon,
} from '@fluentui/react-icons';

import {
  Avatar,
  Button,
  Chip,
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
  useDisclosure,
} from '@nextui-org/react';
import {toast, Toaster} from 'sonner';

import EditOrderModal from './EditOrderModal/EditOrderModal';
import NewOrderModal from './NewOrderModal/NewOrderModal';

import {capitalize} from './utils';

import {createNewOrder, fetchOrders, removeOrder} from '../../actions';
import styles from './OrdersTable.module.css';

const statusColorMap = {
  COMPLETE: 'success',
  UNPAID: 'danger',
  Opłacone: 'warning',
};

const statusNameMap = {
  COMPLETE: 'Zrealizowane',
  UNPAID: 'Nieopłacone',
  Opłacone: 'Opłacone',
};

const statusOptions = [
  {name: 'Zrealizowane', uid: 'COMPLETE'},
  {name: 'Opłacone', uid: 'PAID'},
  {name: 'Nieopłacone', uid: 'UNPAID  '},
];

const INITIAL_VISIBLE_COLUMNS = ['name', 'date', 'order', 'status', 'price', 'actions'];

const columns = [
  {name: 'ID', uid: 'id', sortable: true},
  {name: 'ZAMAWIAJĄCY', uid: 'name', sortable: true},
  {name: 'DATA ZAMÓWIENIA', uid: 'date', sortable: true},
  {name: 'ZAMÓWIENIE', uid: 'order'},
  {name: 'NALEŻNOŚĆ', uid: 'price', sortable: true},
  {name: 'STATUS', uid: 'status', sortable: true},
  {name: '', uid: 'actions'},
];

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

const StatusChip = ({updateOrderStatus, status}) => {
  const [selectedStatus, setSelectedStatus] = React.useState(status);

  console.log(status);

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
            {statusNameMap[selectedStatus]}
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
        onAction={status => {
          console.log('Selection change: ', status);
          setSelectedStatus(status);
        }}
      >
        <DropdownItem key={'COMPLETE'} className="capitalize">
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

const NewOrderButton = ({onClick = () => {}}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 599px)').matches;
    setIsMobile(isMobile);
  }, []);

  if (isMobile) {
    return (
      <Button isIconOnly onClick={onClick} color="primary">
        <ReceiptAdd20Filled />
      </Button>
    );
  } else {
    return (
      <Button color="primary" endContent={<ReceiptAdd20Filled />} onClick={onClick}>
        Dodaj zamówienie
      </Button>
    );
  }
};

export default function OrdersTable() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  const handleFetchOrders = async () => {
    const result = await fetchOrders();
    setOrders(
      result.map(order => ({
        ...order,
        date: new Date(order.created_at).toISOString().split('T')[0],
      }))
    );
  };

  const handleCreateNewOrder = async data => {
    await createNewOrder({
      recipientId: data.recipient,
      price: data.price,
      order: data.order,
    });

    handleFetchOrders();
  };

  const handleRemoveOrder = async orderId => {
    try {
      await removeOrder({orderId});
      await handleFetchOrders();
      toast('Zamówienie zostało usunięte', {type: 'success'});
    } catch (error) {
      console.error('Error while removing order: ', error);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    handleFetchOrders().finally(() => setIsLoading(false));
  }, []);

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'status',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...orders];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter(order =>
        order.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredOrders = filteredOrders.filter(order =>
        Array.from(statusFilter).includes(order.status)
      );
    }

    return filteredOrders;
  }, [orders, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((order, columnKey) => {
    const cellValue = order[columnKey];

    switch (columnKey) {
      case 'name':
        return <AvaratName imgSrc={order.avatar} name={order.athletes.full_name} />;
      case 'status':
        return <StatusChip status={cellValue} handleUpdateStatus={() => {}} />;
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
                {/* <DropdownItem>View</DropdownItem> */}
                <DropdownItem
                  onPress={() => handleEditClick(order.id, order.name, order.price, order.order)}
                >
                  Edytuj
                </DropdownItem>
                <DropdownItem onPress={() => handleRemoveOrder(order.id)}>Usuń</DropdownItem>
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

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCreationModalOpen,
    onOpen: onCreationModalOpen,
    onOpenChange: onCreationModalOpenChange,
  } = useDisclosure();

  const [editedOrder, setEditedOrder] = React.useState(null);

  const handleUpdateStatus = (id, newStatus) => {};

  const handleEditClick = (orderId, recipientId, price, order) => {
    console.log('before', editedOrder);
    setEditedOrder({orderId, recipientId, price, order});
    console.log('after', editedOrder);
    onEditModalOpen();
  };

  const handleRemoveClick = orderId => {
    toast('Zamówienie zostało usunięte', {type: 'success'});
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Toaster richColors closeButton position="bottom-center" />
        <NewOrderModal
          isOpen={isCreationModalOpen}
          onOpenChange={onCreationModalOpenChange}
          handleCreateNewOrder={handleCreateNewOrder}
        />
        {editedOrder && (
          <EditOrderModal
            isOpen={isEditModalOpen}
            onOpenChange={onEditModalOpenChange}
            editedOrder={editedOrder}
            onClose={() => setEditedOrder(null)}
          />
        )}
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Wyszukaj zamawiającego..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
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
                onSelectionChange={setVisibleColumns}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <NewOrderButton onClick={onCreationModalOpen} />
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    orders.length,
    onSearchChange,
    hasSearchFilter,
    onEditModalOpen,
    isEditModalOpen,
    onEditModalOpenChange,
    isCreationModalOpen,
    onCreationModalOpen,
    onCreationModalOpenChange,
    editedOrder,
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
        <div className="hidden sm:flex w-[30%] justify-end gap-2"></div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[450px]',
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
      {/* <TableBody emptyContent={'No orders found'} items={sortedItems}> */}
      <TableBody emptyContent={isLoading ? <Spinner /> : 'Brak zamówień.'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
