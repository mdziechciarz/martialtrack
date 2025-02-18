'use client';

import {Tab, Tabs} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import NewMessageTab from './components/NewMessageTab/NewMessageTab';
import ScheduledMessagesTab from './components/ScheduledMessagesTab/ScheduledMessagesTab';
import SentHistoryTab from './components/SentHistoryTab/SentHistoryTab';

import {useEffect, useState} from 'react';
import styles from './MessagesPage.module.css';
import {fetchMessages, removeMessage} from './actions';

const MessagesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const sentMessages = messages
    .filter(message => message.status === 'sent')
    .map(message => ({...message, date: new Date(message.created_at).toLocaleString()}));
  const scheduledMessages = messages.filter(message => message.status === 'scheduled');

  const handleFetchMessages = async () => {
    const result = await fetchMessages();
    if (result.success && result.data) {
      setMessages(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchMessages();
  }, []);

  const handleRemoveMessage = async id => {
    await removeMessage({id});
    handleFetchMessages();
  };

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
            <NewMessageTab handleFetchMessages={handleFetchMessages} />
          </Tab>
          <Tab key="sentMessages" title="Wysłane">
            <SentHistoryTab
              messages={sentMessages}
              isLoading={isLoading}
              handleRemoveMessage={handleRemoveMessage}
            />
          </Tab>
          <Tab key="scheduled" title="Zaplanowane">
            <ScheduledMessagesTab />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default MessagesPage;
