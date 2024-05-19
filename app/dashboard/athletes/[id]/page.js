'use client';

import Button from '@/components/Button/Button';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {Chat12Filled} from '@fluentui/react-icons';
import {Tab, Tabs} from '@nextui-org/react';
import AthleteDetailsView from './AthleteDetailsView/AthleteDetailsView';
import styles from './AthletePage.module.css';
import ParentDetailsView from './components/ParentDetailsView/ParentDetailsView';

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
            <AthleteDetailsView />
          </Tab>
          <Tab key="payments" title="Składki">
            <p>Składki</p>
          </Tab>
          <Tab key="parents" title="Dane rodziców">
            <ParentDetailsView />
          </Tab>
          <Tab key="orders" title="Zamówienia">
            <p>Zamówienia</p>
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default AthletePage;
