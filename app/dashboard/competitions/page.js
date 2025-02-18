'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {People12Filled} from '@fluentui/react-icons';
import {Button, Ripple, Spinner, Tab, Tabs, useRipple} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import styles from './CompetitionsPage.module.css';
import {fetchCompetitions} from './actions';

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const upcomingCompetitions = competitions.filter(
    competition => new Date(competition.date_end) >= new Date()
  );
  const pastCompetitions = competitions.filter(
    competition => new Date(competition.date_end) < new Date()
  );

  const handleFetchCompetitions = async () => {
    const result = await fetchCompetitions();
    if (result.data) {
      console.log(result.data);
      setCompetitions(result.data);
    } else {
      console.log(result.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchCompetitions();
  }, []);

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zawody" />
        <div className={styles.buttonsContainer}>
          <Button className={styles.addCompetitionButton} color="primary">
            Nowe zawody
          </Button>
        </div>
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          onChange={index => console.log(index)}
          classNames={{tabList: styles.tabList, cursor: styles.tabCursor, tab: styles.tab}}
        >
          <Tab
            key="active"
            title={isLoading ? 'Nadchodzące' : `Nadchodzące (${upcomingCompetitions.length})`}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <ul className={styles.competitionsList}>
                {upcomingCompetitions.map(competition => (
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
            )}
          </Tab>
          <Tab
            key="past"
            title={isLoading ? 'Zakończone' : `Zakończone (${pastCompetitions.length})`}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <ul className={styles.competitionsList}>
                {pastCompetitions.map(competition => (
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
            )}
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

const CompetitionCard = ({
  color = '#FFF',
  name,
  dateStart,
  dateEnd,
  location,
  participantsCount,
}) => {
  const router = useRouter();

  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
    router.push(`/dashboard/competitions/123}`);
  };

  return (
    <div
      className={styles.competitionCardContainer}
      style={{borderLeftColor: color, position: 'relative', overflow: 'hidden'}}
      ref={domRef}
      onClick={handleClick}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
      <div className={styles.detailsContainer} style={{borderLeftColor: color}}>
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
        <p className={styles.entrantsText}>{participantsCount}</p>
      </div>
    </div>
  );
};

export default CompetitionsPage;
