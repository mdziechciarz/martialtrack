'use client';

import {People12Filled} from '@fluentui/react-icons';
import {Tooltip} from '@nextui-org/react';
import styles from './CompetitionsSection.module.css';

const CompetitionsSection = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Nadchodzące zawody</h3>
      <ul className={styles.competitionsList}>
        <CompetitionCard
          color="red"
          name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
          dateStart="2024-03-02"
          dateEnd="2024-03-03"
          location="Warszawa"
          entrantsConfirmed={15}
          entrantsTotal={20}
        />
        <CompetitionCard
          color="purple"
          name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
          dateStart="2024-03-02"
          dateEnd="2024-03-03"
          location="Warszawa"
          entrantsConfirmed={15}
          entrantsTotal={20}
        />
        <CompetitionCard
          color="green"
          name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
          dateStart="2024-03-02"
          dateEnd="2024-03-03"
          location="Warszawa"
          entrantsConfirmed={15}
          entrantsTotal={20}
        />
      </ul>
    </div>
  );
};

export default CompetitionsSection;

const CompetitionCard = ({
  color = '#FFF',
  name,
  dateStart,
  dateEnd,
  location,
  entrantsTotal,
  entrantsConfirmed,
}) => {
  return (
    <div className={styles.competitionCardContainer} style={{borderLeftColor: color}}>
      <div className={styles.detailsContainer}>
        <h3 className={styles.competitionName}>{name}</h3>
        <p className={styles.competitionDate}>
          {dateStart} - {dateEnd}
        </p>
        <p className={styles.competitionLocation}>{location}</p>
      </div>

      <div className={styles.entrantsContainer}>
        <div className={styles.entrantsIcon}>
          <People12Filled />
        </div>
        <Tooltip
          content={`${entrantsConfirmed} zawodników potwierdzonych z ${entrantsTotal} zaproszonych`}
          delay={700}
          placement="bottom"
        >
          <p className={styles.entrantsText}>
            {entrantsConfirmed}/{entrantsTotal}
          </p>
        </Tooltip>
      </div>
    </div>
  );
};
