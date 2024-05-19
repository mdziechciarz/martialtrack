import Card from '../../AthleteDetailsView/components/Card/Card';
import styles from './ParentDetailsView.module.css';

const ParentDetailsView = () => {
  return (
    <div className={styles.mainContainer}>
      <Card
        title="Rodzic 1"
        entries={{
          Imię: 'Anna',
          Nazwisko: 'Kowalska',
          'Nr telefonu': '+48 721499204',
          'E-mail': 'a.kowalska@email.com',
          Ulica: 'Zielona',
          'Nr domu/mieszkania': '13',
          Miejscowość: 'Zawiercie',
          'Kod pocztowy': '42-400',
        }}
      />
      <Card
        title="Rodzic 2"
        entries={{
          Imię: 'Tadeusz',
          Nazwisko: 'Kowalski',
          'Nr telefonu': '+48 521499204',
          'E-mail': 't.kowalski@email.com',
          Ulica: 'Zielona',
          'Nr domu/mieszkania': '13',
          Miejscowość: 'Zawiercie',
          'Kod pocztowy': '42-400',
        }}
      />
    </div>
  );
};

export default ParentDetailsView;
