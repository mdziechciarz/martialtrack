'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {Send16Filled} from '@fluentui/react-icons';
import {Button, Tab, Tabs} from '@nextui-org/react';
import CoachDetailstab from './components/CoachDetailsTab/CoachDetailsTab';
import PaymentsTab from './components/PaymentsTab/PaymentsTab';

import styles from './CoachPage.module.css';

const CoachPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.sendMessageButton}
            color="primary"
            endContent={<Send16Filled />}
          >
            Wiadomość
          </Button>
        </div>
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
          <Tab key="details" title="Dane podstawowe">
            <CoachDetailstab />
          </Tab>
          <Tab key="payments" title="Składki">
            <PaymentsTab />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default CoachPage;
