'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Tab, Tabs} from '@nextui-org/react';

import styles from './MessagesPage.module.css';
import NewMessageTab from './components/NewMessageTab/NewMessageTab';

const MessagesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Wiadomości" />
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
          <Tab key="newMessage" title="Nowa wiadomość">
            <NewMessageTab />
          </Tab>
          <Tab key="sentMessages" title="Wysłane">
            <p>Wysłane</p>
          </Tab>
          <Tab key="scheduled" tille="Zaplanowane">
            <p>Zaplanowane</p>
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default MessagesPage;
