import AvatarCard from './components/AvatarCard/AvatarCard';
// import Card from './components/Card/Card';
import Card, {CardEntries} from '@/components/Card/Card';
import GroupsCard from './components/GroupsCard/GroupsCard';
import examplePhoto from './example_photo.png';

import styles from './CoachDetailsTab.module.css';

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
  return (
    <div className={styles.mainContainer}>
      <AvatarCard className={styles.avatarCard} name="Karolina Kowalska" imgSrc={examplePhoto} />
      <Card title="Dane zawodnika">
        <CardEntries
          entries={{
            Płeć: 'Kobieta',
            'Data urodzenia': '2000-06-23',
            PESEL: '12345678901',
            'Miejsce urodzenia': 'Warszawa',
          }}
        />
      </Card>
      <Card title="Adres zamieszkania" className={styles.addressCard}>
        <CardEntries
          entries={{
            Ulica: 'Kwiatowa',
            'Numer domu/mieszkania': '12',
            Miasto: 'Warszawa',
            'Kod pocztowy': '12-345',
          }}
        />
      </Card>
      <Card title="Dane kontaktowe" className={styles.contactCard}>
        <CardEntries
          entries={{
            Telefon: '123456789',
            Email: 'karolina.kowalska@gmail.com',
          }}
        />
      </Card>
      <GroupsCard
        className={styles.groupsCard}
        groupsAsCoach={exampleGroups.slice(0, -1)}
        groupsAsAssistant={exampleGroups.slice(-1)}
      />
      <Card title="Stopnie">
        <CardEntries
          entries={{
            Kickboxing: 'I Dan',
            Taekwondo: 'III Dan',
          }}
        />
      </Card>
      <Card title="Licencje" className={styles.licensesCard}>
        <CardEntries
          className={styles.licensesCardGrid}
          entries={{
            'Licencja PZKB': 'Ważna do 24.12.2023 \t ARE/2017/SDFSD/124',
            'Zaświadczenie o niekaralności': 'Ważne do 24.12.2023 \t BCE/2019/SDFSD/124',
          }}
        />
      </Card>
      <Card title="Inne">
        <CardEntries
          entries={{
            'Data zatrudnienia': '2021-01-01',
          }}
        />
      </Card>
      <Card className={styles.medicalDataCard} title="Dane medyczne">
        <CardEntries
          entries={{
            'Grupa krwi': '0+',
            'Choroby przewlekłe': 'brak',
            Alergie: 'brak',
          }}
        />
      </Card>
    </div>
  );
};

export default CoachDetailsTab;
