import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

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

import Card from '@/components/Card/Card';
import AddParticipantModal from './components/AddParticipantModal/AddParticipantModal';
import EditParticipantModal from './components/EditParticipantModal/EditParticipantModal';

import {createClient} from '@/utils/supabase/client';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './ParticipantsCard.module.css';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const columns = [
  {name: 'ZAWODNIK', uid: 'name', sortable: true},
  {name: 'FORMUŁY', uid: 'categories'},
  {name: 'GRUPY  ', uid: 'groups'},
  {name: 'DATA URODZENIA  ', uid: 'date_of_birth', sortable: true},
  {name: 'ZGODA', uid: 'consent', sortable: true},
  {name: 'OPŁATA', uid: 'payment', sortable: true},
  {name: 'WAGA', uid: 'weight', sortable: true},
  {name: 'WZROST', uid: 'height', sortable: true},
  // {name: 'BADANIA LEKARSKIE', uid: 'medical_checkups', sortable: true},
  // {name: 'STOPIEŃ', uid: 'level', sortable: true},
  {name: '', uid: 'actions'},
];

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'categories',
  'payment',
  'consent',
  // 'medical_checkups',
  'weight',
  'height',
  'actions',
];

export default function ParticipantsCard({
  className = '',
  participants = [],
  handleAddParticipant,
  handleRemoveParticipant,
  handleUpdateParticipant,
}) {
  const supabase = createClient();

  const [groups, setGroups] = useState([]);

  return (
    <Card title="Uczestnicy" className={`${styles.cardContainer} ${className}`}>
      <ParticipantsTable
        participants={participants}
        groupOptions={groups}
        handleAddParticipant={handleAddParticipant}
        handleRemoveParticipant={handleRemoveParticipant}
        handleUpdateParticipant={handleUpdateParticipant}
      />
    </Card>
  );
}

const AddParticipantButton = ({onClick = () => {}}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 599px)').matches;
    setIsMobile(isMobile);
  }, []);

  if (isMobile) {
    return (
      <Button isIconOnly onPress={onClick} color="primary">
        <PersonAdd20Filled />
      </Button>
    );
  } else {
    return (
      <Button onPress={onClick} color="primary" endContent={<PersonAdd20Filled />}>
        Nowy uczestnik
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
    // <Link onClick={handleClick} className={styles.avatarNameContainer}>
    <Link
      href={`/dashboard/athletes/${id}`}
      rel="noopener noreferrer"
      target="_blank"
      className={styles.avatarNameContainer}
    >
      {/* <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} /> */}
      <Image
        src={'https://i.pravatar.cc/150?img=45x'}
        alt={name}
        width={24}
        height={24}
        className={styles.avatar}
      />
      <span className={styles.name}>{name}</span>
    </Link>
  );
};

const ParticipantsTable = ({
  participants = [],
  groupOptions,
  handleAddParticipant,
  handleRemoveParticipant,
  handleUpdateParticipant,
}) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'name',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredParticipants = [...participants];

    if (hasSearchFilter) {
      filteredParticipants = filteredParticipants.filter(participant =>
        participant.athlete.full_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredParticipants = filteredParticipants.filter(user =>
    //     Array.from(statusFilter).includes(user.status)
    //   );
    // }

    return filteredParticipants;
  }, [participants, filterValue, statusFilter]);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isEditionModalOpen,
    onOpen: onEditionModalOpen,
    onOpenChange: onEditionModalOpenChange,
  } = useDisclosure();

  const [editedParticipant, setEditedParticipant] = React.useState(null);

  const handleEditClick = (athlete, weight, height, consent, payment, categories) => {
    setEditedParticipant({
      athlete,
      weight,
      height,
      consent,
      payment,
      categories: Object.values(categories),
    });
    onEditionModalOpen();
  };

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

  const renderCell = React.useCallback((participant, columnKey) => {
    const cellValue = participant[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          // <User avatarProps={{src: user.avatar}} description={user.email} name={cellValue}>
          //   {user.email}
          // </User>
          <AvaratName
            id={participant.athlete.id}
            imgSrc={participant.athlete.avatar}
            name={participant.athlete.full_name}
          />
        );
      case 'date_of_birth':
        return <p>{participant.athlete.date_of_birth}</p>;
      case 'medical_checkups':
        return (
          <p className={styles.medicalCheckupsCell}>
            {cellValue}
            <CheckboxChecked20Filled style={{color: '#7BD879'}} />
          </p>
          // <p className={styles.medicalCheckupsCell}>
          //   {cellValue}
          //   {cellValue < new Date().toISOString().split('T')[0] ? (
          //     <DismissCircle16Filled style={{color: '#FF5151'}} />
          //   ) : (
          //     <CheckboxChecked20Filled style={{color: '#7BD879'}} />
          //   )}
          // </p>
        );
      case 'weight':
        return <p>{cellValue}kg</p>;
      case 'height':
        return <p>{cellValue}cm</p>;
      case 'payment':
        return (
          <p className={styles.medicalCheckupsCell}>
            {cellValue ? (
              <CheckboxChecked20Filled style={{color: '#7BD879'}} />
            ) : (
              <DismissCircle16Filled style={{color: '#FF5151'}} />
            )}
          </p>
        );
      case 'consent':
        return (
          <p className={styles.medicalCheckupsCell}>
            {cellValue ? (
              <CheckboxChecked20Filled style={{color: '#7BD879'}} />
            ) : (
              <DismissCircle16Filled style={{color: '#FF5151'}} />
            )}
          </p>
        );
      case 'groups':
        return (
          <ul className={styles.groupsList}>
            {participant.athlete.group_members.map(({groups: group}) => (
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
      case 'categories':
        // return <p style={{whiteSpace: 'pre'}}>{cellValue}</p>;
        return (
          <ul className={styles.groupsList}>
            {Object.keys(cellValue).map(key => {
              const category = cellValue[key];
              return (
                <li key={key}>
                  <Chip variant="flat">
                    {category.formula + ', ' || ''}
                    {category.ageCategory + ', ' || ''}
                    {category.weightAndHeightCategory || ''}
                  </Chip>
                </li>
              );
            })}
          </ul>
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
                <DropdownItem
                  onPress={() =>
                    handleEditClick(
                      participant.athlete,
                      participant.weight,
                      participant.height,
                      participant.consent,
                      participant.payment,
                      participant.categories
                    )
                  }
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onPress={() => handleRemoveParticipant(participant.athlete.id)}
                >
                  Delete
                </DropdownItem>
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
        <AddParticipantModal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          handleAddParticipant={handleAddParticipant}
        />
        {editedParticipant && (
          <EditParticipantModal
            isOpen={isEditionModalOpen}
            onOpenChange={onEditionModalOpenChange}
            editedParticipant={editedParticipant}
            handleUpdateParticipant={handleUpdateParticipant}
            // onClosed={() => setEditedParticipant(null)}
          />
        )}
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
            <AddParticipantButton onClick={onModalOpen} />
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
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
        </div> */}
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    participants.length,
    onSearchChange,
    hasSearchFilter,
    onModalOpen,
    isModalOpen,
    onModalOpenChange,
    onEditionModalOpen,
    isEditionModalOpen,
    onEditionModalOpenChange,
    editedParticipant,
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
      aria-label="Tabela uczestników zawodów"
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
            className={classNames({
              [styles.stickyColumn]: column.uid === 'name',
            })}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'Nie dodano jeszcze żadnych uczestników.'} items={sortedItems}>
        {item => (
          <TableRow key={item.athlete.id}>
            {columnKey => (
              <TableCell
                className={classNames({
                  [styles.stickyColumn]: columnKey === 'name',
                })}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
