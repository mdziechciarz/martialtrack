'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {
  Checkmark20Filled,
  Delete16Filled,
  MoreVertical16Filled,
  Prohibited16Filled,
} from '@fluentui/react-icons';
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
import AthleteDetailsTab from './components/AthleteDetailsTab/AthleteDetailsTab';
import ParentDetailsTab from './components/ParentDetailsTab/ParentDetailsTab';

import {useState} from 'react';
import styles from './AthletePage.module.css';

const AthletePage = () => {
  const [fullName, setFullName] = useState('');

  return (
    <MainLayout>
      <ContentContainer>
        <div className={styles.buttonsContainer}>
          {/* <Button color="primary" endContent={<Send16Filled />}>
            Wiadomość
          </Button> */}
          <Buttons />
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
          <Tab key="athleteDetails" title="Dane zawodnika">
            <AthleteDetailsTab />
          </Tab>
          <Tab key="parents" title="Dane rodziców">
            <ParentDetailsTab />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button color="primary" startContent={<Checkmark20Filled />}>
        Zapisz zawodnika
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <MoreVertical16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1" endContent={<Delete16Filled />}>
            Usuń zawodnika
          </DropdownItem>
          <DropdownItem key="2" endContent={<Prohibited16Filled />}>
            Oznacz jako nieaktywny
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default AthletePage;
