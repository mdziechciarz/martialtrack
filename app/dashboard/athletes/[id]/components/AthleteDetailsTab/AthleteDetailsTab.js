import {useEffect, useState} from 'react';

import AvatarCard from './components/AvatarCard/AvatarCard';
// import Card from './components/Card/Card';
import AddressCard from './components/AddressCard/AddressCard';
import ContactCard from './components/ContactCard/ContactCard';
import GroupsCard from './components/GroupsCard/GroupsCard';
import OtherDetailsCard from './components/OtherDetailsCard/OtherDetailsCard';
import PersonalDetailsCard from './components/PersonalDetailsCard/PersonalDetailsCard';
import examplePhoto from './example_photo.png';

import GradingsCard from './components/GradingsCard/GradingsCard';
import LicensesCard from './components/LicensesCard/LicensesCard';

import styles from './AthleteDetailsTab.module.css';

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
  {
    id: '46546',
    color: 'red',
    groupName: 'K1',
    coachName: 'Szymon Nowak',
    days: 'Poniedziałek',
    hours: '19:00 - 20:00',
  },
];

const CoachDetailsTab = () => {
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
      <GroupsCard
        className={styles.groupsCard}
        groupsAsCoach={exampleGroups.slice(0, -1)}
        groupsAsAssistant={exampleGroups.slice(-1)}
      />
      <GradingsCard />
      <LicensesCard />
      <OtherDetailsCard />
    </div>
  );
};

export default CoachDetailsTab;
