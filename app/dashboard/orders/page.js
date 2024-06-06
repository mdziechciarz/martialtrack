'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {ReceiptAdd20Filled} from '@fluentui/react-icons';
import {Button, useDisclosure} from '@nextui-org/react';
import OrdersTable from './components/OrdersTable/OrdersTable';

import styles from './OrdersPage.module.css';
import NewOrderModal from './components/OrdersTable/NewOrderModal/NewOrderModal';

const OrdersPage = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zamówienia" />
        <NewOrderModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.sendMessageButton}
            color="primary"
            endContent={<ReceiptAdd20Filled />}
            onClick={onModalOpen}
          >
            Dodaj zamówienie
          </Button>
        </div>
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Zamówienia (13)</h3>
          <OrdersTable />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};

export default OrdersPage;
