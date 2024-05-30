'use client';

import {Tab, Tabs} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import GroupsGrid from './components/GroupsGrid/GroupsGrid';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';

import styles from './PaymentsPage.module.css';

const PaymentsPage = () => {
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
            <PaymentsTable />
          </Tab>
          <Tab key="groups" title="Grupy">
            <GroupsGrid />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default PaymentsPage;
