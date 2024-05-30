import styles from './AthleteDetailsTab.module.css';
import AvatarCard from './components/AvatarCard/AvatarCard';
import Card from './components/Card/Card';
import GroupsCard from './components/GroupsCard/GroupsCard';
import examplePhoto from './example_photo.png';

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
  return (
    <div className={styles.mainContainer}>
      <AvatarCard className={styles.avatarCard} name="Karolina Kowalska" imgSrc={examplePhoto} />
      <Card
        title="Dane zawodnika"
        entries={{
          Płeć: 'Kobieta',
          'Data urodzenia': '2000-06-23',
          PESEL: '12345678901',
          'Miejsce urodzenia': 'Warszawa',
        }}
      />
      <Card
        title="Adres zamieszkania"
        className={styles.addressCard}
        entries={{
          Ulica: 'Kwiatowa',
          'Numer domu/mieszkania': '12',
          Miasto: 'Warszawa',
          'Kod pocztowy': '12-345',
        }}
      />
      <Card
        title="Dane kontaktowe"
        className={styles.contactCard}
        entries={{
          Telefon: '123456789',
          Email: 'karolina.kowalska@gmail.com',
        }}
      />
      <GroupsCard className={styles.groupsCard} groups={exampleGroups} />
      <Card
        title="Stopnie"
        entries={{
          Kickboxing: 'U3',
          Taekwondo: '4 cup',
        }}
      />
      <Card
        title="Badania i licencje"
        className={styles.licensesCard}
        entries={{'Licencja PZKB': 'Ważna do 24.12.2023 \t ARE/2017/SDFSD/124'}}
      />
      <Card
        title="Inne"
        entries={{
          'Data przyjęcia': '2021-01-01',
        }}
      />
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
