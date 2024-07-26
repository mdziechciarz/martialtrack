'use client';

import {
  Add16Filled,
  Cart16Filled,
  ClipboardTaskList16Filled,
  Person16Filled,
  Send16Filled,
  Wallet16Filled,
} from '@fluentui/react-icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import RecordPaymentModal from './components/RecordPaymentModal/RecordPaymentModal';

import styles from './FAB.module.css';
import NewOrderModal from './components/NewOrderModal/NewOrderModal';

const FAB = () => {
  const {
    isOpen: isPaymentModalOpen,
    onOpen: onPaymentModalOpen,
    onOpenChange: onPaymentModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isOrderModalOpen,
    onOpen: onOrderModalOpen,
    onOpenChange: onOrderModalOpenChange,
  } = useDisclosure();

  const router = useRouter();

  return (
    <>
      <RecordPaymentModal isOpen={isPaymentModalOpen} onOpenChange={onPaymentModalOpenChange} />
      <NewOrderModal isOpen={isOrderModalOpen} onOpenChange={onOrderModalOpenChange} />
      <Dropdown>
        <DropdownTrigger>
          <Button className={styles.fab} color="primary" variant="shadow" isIconOnly>
            <Add16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onClick={() => router.push('/dashboard/athletes/new')}
            startContent={<Person16Filled />}
          >
            Nowy zawodnikę
          </DropdownItem>
          <DropdownItem onClick={onPaymentModalOpen} startContent={<Wallet16Filled />}>
            Wpłata
          </DropdownItem>
          <DropdownItem
            onClick={() => router.push('/dashboard/attendance')}
            startContent={<ClipboardTaskList16Filled />}
          >
            Lista obecności
          </DropdownItem>
          <DropdownItem onClick={onOrderModalOpen} startContent={<Cart16Filled />}>
            Zamówienia
          </DropdownItem>
          <DropdownItem
            onClick={() => router.push('/dashboard/messages')}
            startContent={<Send16Filled />}
          >
            Wiadomość
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default FAB;
