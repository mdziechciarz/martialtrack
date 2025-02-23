'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {Delete16Filled, MoreVertical16Filled, Send16Filled} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from '@nextui-org/react';
import CoachDetailstab from './components/CoachDetailsTab/CoachDetailsTab';

import styles from './CoachPage.module.css';

const CoachPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <div className={styles.buttonsContainer}>
          <Buttons />
        </div>
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
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
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button color="primary" startContent={<Send16Filled />}>
        Wiadomość
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <MoreVertical16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1" endContent={<Delete16Filled />}>
            Usuń profil trenera
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default CoachPage;
