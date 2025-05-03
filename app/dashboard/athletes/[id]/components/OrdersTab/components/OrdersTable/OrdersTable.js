import React, {useEffect, useState} from 'react';

import {
  ChevronDown20Regular as ChevronDownIcon,
  ReceiptAdd20Filled,
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
import {toast, Toaster} from 'sonner';

import EditOrderModal from './EditOrderModal/EditOrderModal';
import NewOrderModal from './NewOrderModal/NewOrderModal';

import {capitalize} from './utils';

import {
  createNewOrder,
  removeOrder,
  updateOrder,
  updateOrderStatus,
} from '@/app/dashboard/athletes/[id]/actions/updateAthleteOrders';
import styles from './OrdersTable.module.css';

const statusColorMap = {
  complete: 'success',
  unpaid: 'danger',
  paid: 'warning',
};

// const statusNameMap = {
//   complete: 'Zrealizowane',
//   unpaid: 'Nieopłacone',
//   paid: 'Opłacone',
// };

const statusOptions = [
  {name: 'Zrealizowane', uid: 'complete'},
  {name: 'Opłacone', uid: 'paid'},
  {name: 'Nieopłacone', uid: 'unpaid'},
];

const INITIAL_VISIBLE_COLUMNS = ['created_at', 'order', 'status', 'price', 'actions'];

const columns = [
  {name: 'Data zamówienia', uid: 'created_at', sortable: true},
  {name: 'Zamówienie', uid: 'order'},
  {name: 'Nalezność', uid: 'price', sortable: true},
  {name: 'Status', uid: 'status', sortable: true},
  {name: '', uid: 'actions'},
];

const StatusChip = ({handleUpdateOrderStatus, currentStatus, orderId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async ({newStatus}) => {
    try {
      setIsLoading(true);
      await handleUpdateOrderStatus({orderId, status: newStatus});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dropdown isDisabled={isLoading}>
      <DropdownTrigger className="hidden sm:flex">
        <div
          className={styles.statusChipContainer}
          style={{cursor: isLoading ? 'unset' : 'pointer'}}
        >
          <Chip
            className="capitalize"
            color={statusColorMap[currentStatus]}
            size="sm"
            variant="flat"
            // isDisabled={isLoading}
          >
            {statusOptions.find(option => option.uid === currentStatus)?.name || '-'}
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
        selectedKeys={currentStatus}
        selectionMode="single"
        onAction={status => handleUpdate({newStatus: status})}
      >
        {statusOptions
          .filter(status => status.uid != currentStatus)
          .map(status => (
            <DropdownItem key={status.uid} className="capitalize">
              {capitalize(status.name)}
            </DropdownItem>
          ))}
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

export default function OrdersTable({athleteId, orders = [], refetchAthleteData}) {
  const handleCreateNewOrder = async data => {
    try {
      const {success} = await createNewOrder({
        recipientId: athleteId,
        price: data.price,
        order: data.order,
      });
      if (success) {
        await refetchAthleteData();
        toast('Zamówienie zostało dodane', {type: 'success'});
      } else {
        toast('Nie udało się dodać zamówienia', {type: 'error'});
      }
    } catch (error) {
      toast('Nie udało się dodać zamówienia', {type: 'error'});
    }
  };

  const handleRemoveOrder = async orderId => {
    try {
      const {success} = await removeOrder({orderId});
      if (success) {
        await refetchAthleteData();
        toast('Zamówienie zostało usunięte', {type: 'success'});
      } else {
        toast('Nie udało się usunąć zamówienia', {type: 'error'});
      }
    } catch (error) {
      console.error('Error while removing order: ', error);
    }
  };

  const handleUpdateOrderStatus = async ({orderId, status}) => {
    try {
      const {success} = await updateOrderStatus({orderId, status});
      if (success) {
        await refetchAthleteData();
      } else {
        toast('Nie udało się zaktualizować statusu zamówienia', {type: 'error'});
      }
    } catch (error) {
      console.error('Error while updating order status: ', error);
      toast('Nie udało się zaktualizować statusu zamówienia', {type: 'error'});
    }
  };

  const handleEditOrder = async data => {
    try {
      const {success} = await updateOrder({
        orderId: currentlyEditedOrder.orderId,
        order: data.order,
        price: data.price,
      });
      if (success) {
        await refetchAthleteData();
        toast('Zamówienie zostało zaktualizowane', {type: 'success'});
      } else {
        toast('Nie udało się zaktualizować zamówienia', {type: 'error'});
      }
    } catch (error) {
      console.error('Error while updating order: ', error);
      toast('Nie udało się zaktualizować zamówienia', {type: 'error'});
    }
  };

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
        order.order.toLowerCase().includes(filterValue.toLowerCase())
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
      case 'created_at':
        return new Date(cellValue).toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      case 'order':
        // Keep newline formatting (white-space: pre-wrap;)
        return <p style={{whiteSpace: 'pre-wrap'}}>{cellValue}</p>;
      case 'price':
        return <p>{cellValue} PLN</p>;
      case 'status':
        return (
          <StatusChip
            currentStatus={cellValue}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
            orderId={order.id}
          />
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
                {/* <DropdownItem>View</DropdownItem> */}
                <DropdownItem onPress={() => handleEditClick(order.id, order.price, order.order)}>
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

  const [currentlyEditedOrder, setCurrentlyEditedOrder] = React.useState(null);

  const handleEditClick = (orderId, price, order) => {
    setCurrentlyEditedOrder({orderId, price, order});
    onEditModalOpen();
  };

  React.useEffect(() => {
    if (!isEditModalOpen) {
      setCurrentlyEditedOrder(null);
    }
  }, [isEditModalOpen]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Toaster richColors closeButton position="bottom-center" />
        <NewOrderModal
          isOpen={isCreationModalOpen}
          onOpenChange={onCreationModalOpenChange}
          handleCreateNewOrder={handleCreateNewOrder}
        />
        {currentlyEditedOrder && (
          <EditOrderModal
            isOpen={isEditModalOpen}
            onOpenChange={onEditModalOpenChange}
            editedOrder={currentlyEditedOrder}
            onClose={() => setCurrentlyEditedOrder(null)}
            handleEditOrder={handleEditOrder}
          />
        )}
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Wyszukaj zamówienie..."
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
                {columns
                  .filter(column => column.uid != 'actions')
                  .map(column => (
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
    currentlyEditedOrder,
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
      {/* <TableBody emptyContent={isLoading ? <Spinner /> : 'Brak zamówień.'} items={sortedItems}> */}
      <TableBody emptyContent={'Brak zamówień.'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
