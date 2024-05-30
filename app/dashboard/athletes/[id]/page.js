'use client';

import Button from '@/components/Button/Button';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {Chat12Filled} from '@fluentui/react-icons';
import {Tab, Tabs} from '@nextui-org/react';
import styles from './AthletePage.module.css';
import AthleteDetailsTab from './components/AthleteDetailsTab/AthleteDetailsTab';
import OrdersTab from './components/OrdersTab/OrdersTab';
import ParentDetailsTab from './components/ParentDetailsTab/ParentDetailsTab';
import PaymentsTab from './components/PaymentsTab/PaymentsTab';

const AthletePage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <Button
          text="Wiadomość"
          icon={Chat12Filled}
          className={styles.newMessageButton}
          mobileFullWidth
        />
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          onChange={index => console.log(index)}
          classNames={{
            base: styles.base,
            tabList: styles.tabList,
            cursor: styles.tabCursor,
            tab: styles.tab,
            panel: styles.panel,
          }}
          className={styles.tabsContainer}
        >
          <Tab key="athleteDetails" title="Dane zawodnika">
            <AthleteDetailsTab />
          </Tab>
          <Tab key="payments" title="Składki">
            <PaymentsTab />
          </Tab>
          <Tab key="parents" title="Dane rodziców">
            <ParentDetailsTab />
          </Tab>
          <Tab key="orders" title="Zamówienia">
            <OrdersTab />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default AthletePage;
