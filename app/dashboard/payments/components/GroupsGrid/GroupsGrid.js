import {ArrowDownload20Filled, ChevronDown16Filled} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import GroupPaymentsCard from './components/GroupPaymentsCard';

import exampleGroupPaymentsData from './exampleData';

import styles from './GroupsGrid.module.css';

const GroupsGrid = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <div className={styles.filterButtons}>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex" style={{backgroundColor: 'white'}}>
              <Button endContent={<ChevronDown16Filled className="text-small" />} variant="flat">
                Miesiąc
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Month filter"
              // closeOnSelect={false}
              // selectedKeys={monthFilter}
              // onSelectionChange={setMonthFilter}
            >
              {['Styczeń 2024', 'Luty 2024', 'Marzec 2024', 'Kwiecień 2024'].map(month => (
                <DropdownItem key={month} className="capitalize">
                  {month}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Buttons />
      </div>
      <div className={styles.grid}>
        {exampleGroupPaymentsData.map(group => (
          <GroupPaymentsCard
            key={group.name}
            groupName={group.name}
            color={group.color}
            amountPaid={group.amountPaid}
            amountToBePaid={group.amountToBePaid}
            paidCount={group.paidCount}
            toBePaidCount={group.toBePaidCount}
            payers={group.payers}
          />
        ))}
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
