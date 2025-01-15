'use client';

import {Checkmark20Filled, MoreVertical16Filled} from '@fluentui/react-icons';
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
import {FormProvider, useForm} from 'react-hook-form';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import CoachDetailsTab from './components/CoachDetailsTab/CoachDetailsTab';

import styles from './CoachPage.module.css';

const NewCoachPage = () => {
  const methods = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <MainLayout>
      <ContentContainer>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.buttonsContainer}>
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
              <Tab key="details" title="Dane podstawowe">
                <CoachDetailsTab />
              </Tab>
            </Tabs>
          </form>
        </FormProvider>
      </ContentContainer>
    </MainLayout>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button color="primary" startContent={<Checkmark20Filled />} type="submit">
        Zapisz trenera
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <MoreVertical16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1">Opcja 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default NewCoachPage;
