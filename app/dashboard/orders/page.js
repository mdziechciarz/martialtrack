'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import OrdersTable from './components/OrdersTable/OrdersTable';

import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zamówienia" />
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Zamówienia (13)</h3>
          <OrdersTable />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};

export default OrdersPage;
