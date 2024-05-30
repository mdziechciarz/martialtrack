'use client';

import {
  Add16Filled,
  Cart16Filled,
  ClipboardTaskList16Filled,
  Person16Filled,
  Send16Filled,
  Wallet16Filled,
} from '@fluentui/react-icons';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import styles from './FAB.module.css';

const FAB = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className={styles.fab} color="primary" variant="shadow" isIconOnly>
          <Add16Filled />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onClick={() => router.push('/dashboard/athletes')}
          startContent={<Person16Filled />}
        >
          Nowy zawodnikę
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push('/dashboard/payments')}
          startContent={<Wallet16Filled />}
        >
          Wpłata
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push('/dashboard/attendance')}
          startContent={<ClipboardTaskList16Filled />}
        >
          Lista obecności
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push('/dashboard/orders')}
          startContent={<Cart16Filled />}
        >
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
  );
};

export default FAB;
