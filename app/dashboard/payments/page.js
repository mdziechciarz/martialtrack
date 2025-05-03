'use client';

import {Tab, Tabs} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import GroupsGrid from './components/GroupsGrid/GroupsGrid';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';

import {useEffect, useState} from 'react';
import {getAllPaymentsHistory, getPaymentsHistoryByGroup} from './actions/getPaymentsHistory';

import styles from './PaymentsPage.module.css';

const PaymentsPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isAllPaymentsLoading, setIsAllPaymentsLoading] = useState(false);
  const [isPaymentsByGroupLoading, setIsPaymentsByGroupLoading] = useState(false);
  const [paymentsByGroup, setPaymentsByGroup] = useState([]);

  const handleFetchPayments = async () => {
    try {
      setIsAllPaymentsLoading(true);
      const response = await getAllPaymentsHistory();
      if (response.success && response.data) {
        setPayments(response.data);
        console.log('Payments fetched successfully:', response.data);
      } else {
        console.error('Failed to fetch payments:', response.error);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsAllPaymentsLoading(false);
    }
  };

  const handleFetchPaymentsByGroup = async () => {
    try {
      setIsPaymentsByGroupLoading(true);
      const response = await getPaymentsHistoryByGroup();
      if (response.success && response.data) {
        setPaymentsByGroup(response.data);
        console.log('Payments by group fetched successfully:', response.data);
      } else {
        console.error('Failed to fetch payments by group:', response.error);
      }
    } catch (error) {
      console.error('Error fetching payments by group:', error);
    } finally {
      setIsPaymentsByGroupLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPayments();
    handleFetchPaymentsByGroup();
  }, []);

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Składki członkowskie" />
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          className={styles.tabs}
          classNames={{
            tabList: styles.tabList,
            cursor: styles.tabCursor,
            tab: styles.tab,
            panel: styles.tabPanel,
          }}
        >
          <Tab key="allAthletes" title="Wszyscy zawodnicy">
            <PaymentsTable
              isLoading={isAllPaymentsLoading}
              payments={payments}
              refetchPayments={handleFetchPayments}
            />
          </Tab>
          <Tab key="groups" title="Grupy">
            <GroupsGrid
              isLoading={isPaymentsByGroupLoading}
              paymentsByGroup={paymentsByGroup}
              refetchPayments={handleFetchPaymentsByGroup}
            />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default PaymentsPage;
