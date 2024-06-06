'use client';

import Card, {CardEntries} from '@/components/Card/Card';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Tab, Tabs} from '@nextui-org/react';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';

import styles from './GroupPage.module.css';

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
                className={styles.branchAndColorCard}
                color={competitionData.color}
                dates={competitionData.dates}
                location={competitionData.location}
              />
              <Card
                className={styles.scheduleCard}
                title="Informacje dodatkowe"
                style={{gridRow: 'span 2 / 4'}}
              >
                {/* 1fr column, row span 2 / 4 */}
                <CardEntries
                  style={{gridTemplateColumns: '1fr'}}
                  entries={{
                    'Opis zawodów':
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    Regulamin: 'regulamin_pzkb.pdf',
                  }}
                />
              </Card>
              <Card title="Uczestnicy" className={styles.athletesCard} />
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
