import {useEffect, useState} from 'react';

import AvatarCard from './components/AvatarCard/AvatarCard';
// import Card from './components/Card/Card';
import Card from '@/components/Card/Card';
import AddressCard from './components/AddressCard/AddressCard';
import ContactCard from './components/ContactCard/ContactCard';
import GroupsCard from './components/GroupsCard/GroupsCard';
import OtherDetailsCard from './components/OtherDetailsCard/OtherDetailsCard';
import PersonalDetailsCard from './components/PersonalDetailsCard/PersonalDetailsCard';
import examplePhoto from './example_photo.png';

import styles from './AthleteDetailsTab.module.css';
import GradingsCard from './components/GradingsCard/GradingsCard';
import LicensesCard from './components/LicensesCard/LicensesCard';

const exampleGroups = [
  {
    id: '123',
    color: 'yellow',
    groupName: 'Kickboxing  - Grupa 2',
    coachName: 'Adam Zieliński',
    days: 'Wtorek, Czwartek',
    hours: '18:30 - 20:00',
  },
  {
    id: '456',
    color: 'royalblue',
    groupName: 'Boks',
    coachName: 'Martyna Błachowic',
    days: 'Poniedziałek',
    hours: '19:00 - 20:00',
  },
];

const AthleteDetailsView = () => {
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem('croppedImage') || examplePhoto
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUserAvatar(localStorage.getItem('croppedImage') || examplePhoto);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <AvatarCard className={styles.avatarCard} name="Karolina Kowalska" imgSrc={userAvatar} />
      <PersonalDetailsCard />
      <AddressCard />
      <ContactCard />
      <GroupsCard className={styles.groupsCard} groups={exampleGroups} />
      <GradingsCard />
      {/* <Card
        title="Badania i licencje"
        className={styles.licensesCard}
        entries={{'Licencja PZKB': 'Ważna do 24.12.2023 \t ARE/2017/SDFSD/124'}}
      /> */}
      <LicensesCard />
      <OtherDetailsCard />
      <Card
        className={styles.medicalDataCard}
        title="Dane medyczne"
        entries={{
          'Grupa krwi': '0+',
          'Choroby przewlekłe': 'brak',
          Alergie: 'brak',
        }}
      />
    </div>
  );
};

export default AthleteDetailsView;
