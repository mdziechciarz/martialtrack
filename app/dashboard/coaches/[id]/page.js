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
  Spinner,
  Tab,
  Tabs,
} from '@nextui-org/react';
import CoachDetailstab from './components/CoachDetailsTab/CoachDetailsTab';

import {getCoachData} from './actions/getCoachData';

import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import styles from './CoachPage.module.css';

const CoachPage = () => {
  const router = useRouter();
  const params = useParams();
  const coachId = params.id;

  const [coachData, setCoachData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetCoacheData = async () => {
    try {
      setIsLoading(true);
      if (!coachId) {
        throw new Error('Athlete ID is required');
      }

      const {success, data} = await getCoachData(coachId);
      if (!success || !data) {
        throw new Error('Failed to fetch athlete data');
      }

      console.log('Fetched coach data:', data);

      setCoachData({
        id: data.id,
        fullName: data.full_name,
        pesel: data.pesel,
        sex: data.sex,
        dateOfBirth: data.date_of_birth,
        placeOfBirth: data.place_of_birth,
        streetName: data.street_name,
        houseAndApartmentNumber: data.house_and_apartment_number,
        cityName: data.city_name,
        postalCode: data.postal_code,
        phoneNumber: data.phone_number,
        email: data.email,
        medicalCheckupsAndLicenses: data.licenses,
        other: data.other,
        levels: data.levels,
        avatar_url: data.avatar_url,
        groupsAsCoach: data.groups_as_coach,
        groupsAsAssistant: data.groups_as_assistant,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching athlete data:', error);
      router.push('/dashboard/coaches');
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCoacheData();
  }, [coachId]);

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
            {isLoading ? (
              <Spinner />
            ) : (
              <CoachDetailstab coachData={coachData} refetchCoachData={handleGetCoacheData} />
            )}
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
