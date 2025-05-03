'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Tab, Tabs} from '@nextui-org/react';
import {Toaster} from 'sonner';

import UserProfileTab from './components/UserProfileTab/UserProfileTab';
import UsersTab from './components/UsersTab/UsersTab';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Ustawienia" />
        <Tabs
          variant="underlined"
          color="primary"
          className={styles.tabs}
          classNames={{
            tabList: styles.tabList,
            cursor: styles.tabCursor,
            tab: styles.tab,
            panel: styles.tabPanel,
          }}
        >
          <Tab key="my_profile" title="Mój profil">
            <UserProfileTab />
          </Tab>
          <Tab key="users" title="Użytkownicy">
            <UsersTab />
          </Tab>
          <Tab key="club_settings" title="Ustawienia klubu">
            <div>Club Settings</div>
          </Tab>
          <Tab key="subscription" title="Zarządzanie subskrypcją">
            <div>Subscription</div>
          </Tab>
        </Tabs>
        <Toaster richColors position="bottom-center" />
      </ContentContainer>
    </MainLayout>
  );
};

export default SettingsPage;
