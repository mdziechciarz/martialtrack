'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import {
  Delete16Filled,
  MoreVertical16Filled,
  Prohibited16Filled,
  Send16Filled,
} from '@fluentui/react-icons';
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
import {useEffect, useState} from 'react';
import AthleteDetailsTab from './components/AthleteDetailsTab/AthleteDetailsTab';
import OrdersTab from './components/OrdersTab/OrdersTab';
import PaymentsTab from './components/PaymentsTab/PaymentsTab';

import {getAthleteData} from './actions/getAthleteData';

import {useParams, useRouter} from 'next/navigation';
import styles from './AthletePage.module.css';

const AthletePage = () => {
  const router = useRouter();
  const params = useParams();
  const athleteId = params.id;

  const [athleteData, setAthleteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAthleteData = async () => {
    try {
      setIsLoading(true);
      if (!athleteId) {
        throw new Error('Athlete ID is required');
      }

      const {success, data} = await getAthleteData(athleteId);
      if (!success || !data) {
        throw new Error('Failed to fetch athlete data');
      }

      setAthleteData({
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
        medicalCheckupsAndLicenses: data.medical_checkups_and_licenses,
        other: data.other,
        levels: data.levels,
        groups: data.groups,
        avatar_url: data.avatar_url,
        orders: data.orders,
        membershipPayments: data.membership_payments,
        membershipSettings: data.athlete_membership_settings,
      });
    } catch (error) {
      console.error('Error fetching athlete data:', error);
      router.push('/dashboard/athletes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAthleteData();
  }, [athleteId]);

  return (
    <MainLayout>
      <ContentContainer style={{position: 'relative', minHeight: '80vh'}}>
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
          <Tab key="athleteDetails" title="Dane zawodnika">
            {isLoading ? (
              <Spinner style={{position: 'absolute', top: '50%', left: '50%'}} />
            ) : (
              <AthleteDetailsTab
                athleteData={athleteData}
                refetchAthleteData={handleGetAthleteData}
              />
            )}
          </Tab>
          <Tab key="payments" title="Składki">
            <PaymentsTab
              athleteId={athleteData?.id}
              isLoading={isLoading}
              paymentsData={athleteData?.membershipPayments}
              membershipSettings={athleteData?.membershipSettings}
              refetchAthleteData={handleGetAthleteData}
            />
          </Tab>
          {/* <Tab key="parents" title="Dane rodziców">
                <ParentDetailsTab />
              </Tab> */}
          <Tab key="orders" title="Zamówienia">
            <OrdersTab
              orders={athleteData?.orders}
              athleteId={athleteData?.id}
              refetchAthleteData={handleGetAthleteData}
            />
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
