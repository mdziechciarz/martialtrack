'use client';

import {Ripple, Tooltip, useRipple} from '@nextui-org/react';
import {useEffect, useRef, useState} from 'react';

import {People12Filled} from '@fluentui/react-icons';

import {fetchCompetitions} from '../../competitions/actions';

import styles from './CompetitionsSection.module.css';

const CompetitionsSection = () => {
  const [competitions, setCompetitions] = useState([]);

  const getCompetitions = async () => {
    const response = await fetchCompetitions();

    if (response.success) {
      setCompetitions(response.data);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Nadchodzące zawody</h3>
      <ul className={styles.competitionsList}>
        {/* <CompetitionCard
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
        /> */}
        {/* Sort by date_start and choose first 3 */}
        {/* {competitions.map(competition => ( */}

        {competitions
          .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
          .slice(0, 3)
          .map(competition => (
            <CompetitionCard
              key={competition.id}
              color={competition.color}
              name={competition.name}
              dateStart={competition.date_start}
              dateEnd={competition.date_end}
              location={competition.location}
              participantsCount={competition?.competition_participants?.length}
            />
          ))}
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
  // entrantsTotal,
  // entrantsConfirmed,
  participantsCount,
}) => {
  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
  };

  return (
    <div
      className={styles.competitionCardContainer}
      style={{borderLeftColor: color, position: 'relative', overflow: 'hidden'}}
      ref={domRef}
      onClick={handleClick}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
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
          content={`${participantsCount} zawodników bierze udział`}
          delay={500}
          placement="bottom"
        >
          <p className={styles.entrantsText}>{participantsCount}</p>
        </Tooltip>
      </div>
    </div>
  );
};
