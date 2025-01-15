'use client';

import {Tab, Tabs} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import DetailsCard from './components/DetailsCard/DetailsCard';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';
import ParticipantsCard from './components/ParticipantsCard/ParticipantsCard';
import ResultsCard from './components/ResultsCard/ResultsCard';

import styles from './CompetitionPage.module.css';

const competitionData = {
  name: 'Mistrzostwa Polski Pointfighting, Light Contact Juniorów, Seniorów i Weteranów',
  dates: {
    start: '2021-11-20',
    end: '2021-11-21',
  },
  location: 'Katowice',
  color: '#79dd36',
  level: 'worldCup',
  description: `Mistrzostwa Polski Pointfighting, Light Contact Juniorów, Seniorów i Weteranów to najważniejsze zawody w Polsce w tych kategoriach wiekowych. W zawodach mogą wziąć udział zawodnicy zrzeszeni w Polskim Związku Kickboxingu.`,
  website: 'https://www.pzkickboxing.pl/',
};

const GroupPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle
          title={competitionData.name}
          className={styles.pageTitle}
          style={{borderLeftColor: competitionData.color}}
        />
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          onChange={index => console.log(index)}
          classNames={{
            base: styles.base,
            tabList: styles.tabList,
            cursor: styles.tabCursor,
            tab: styles.tab,
            panel: styles.panel,
          }}
          className={styles.tabsContainer}
        >
          <Tab key="generalInfo" title="Informacje o zawodach">
            <div className={styles.grid}>
              <MainInfoCard
                className={styles.mainInfoCard}
                color={competitionData.color}
                dates={competitionData.dates}
                location={competitionData.location}
                level={competitionData.level}
              />
              <DetailsCard
                className={styles.detailsCard}
                description={competitionData.description}
                website={competitionData.website}
              />
              <ParticipantsCard className={styles.participantsCard} />
            </div>
          </Tab>
          <Tab key="results" title="Wyniki">
            <ResultsCard />
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
