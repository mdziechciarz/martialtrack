'use client';

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
import {FormProvider, useForm} from 'react-hook-form';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import AthleteDetailsTab from './components/AthleteDetailsTab/AthleteDetailsTab';
import ParentDetailsTab from './components/ParentDetailsTab/ParentDetailsTab';

import styles from './AthletePage.module.css';

const AthletePage = () => {
  // form tutaj
  const methods = useForm({
    defaultValues: {
      fullName: '',
      dateOfBirth: undefined,
      pesel: '',
      placeOfBirth: '',
      streetName: '',
      houseAndApartmentNumber: '',
      cityName: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
      parentOne: {
        name: '',
      },
    },
  });

  const onSubmit = data => {};

  return (
    <MainLayout>
      <ContentContainer>
        <FormProvider {...methods}>
          <form
            onSubmit={e => {
              e.preventDefault();
              methods.handleSubmit(onSubmit)();
              console.log(methods.formState.errors);
            }}
          >
            <div className={styles.buttonsContainer}>
              <Buttons />
            </div>
            <Tabs
              variant="underlined"
              color="primary"
              defaultSelectedKey={'athleteDetails'}
              onSelectionChange={key => console.log(key)}
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
