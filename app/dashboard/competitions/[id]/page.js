'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Tab, Tabs} from '@nextui-org/react';
import DetailsCard from './components/DetailsCard/DetailsCard';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';
import ParticipantsCard from './components/ParticipantsCard/ParticipantsCard';

import styles from './CompetitionPage.module.css';

const competitionData = {
  name: 'Mistrzostwa Polski Pointfighting, Light Contact Juniorów, Seniorów i Weteranów',
  dates: '11 - 13.06.2024',
  location: 'Katowice',
  color: '#79dd36',
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
              />
              <DetailsCard className={styles.detailsCard} />
              <ParticipantsCard className={styles.participantsCard} />
            </div>
          </Tab>
          <Tab key="results" title="Wyniki">
            <p>Wyniki medalowe</p>
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
