'use client';

import Button from '@/components/Button/Button';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {People12Filled} from '@fluentui/react-icons';
import {Tab, Tabs} from '@nextui-org/react';
import styles from './CompetitionsPage.module.css';

const CompetitionsPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zawody" />
        <Button
          text="Nowe zawody"
          // icon={ReceiptAdd20Filled}
          className={styles.addCompetitionButton}
        />
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          onChange={index => console.log(index)}
          classNames={{tabList: styles.tabList, cursor: styles.tabCursor, tab: styles.tab}}
        >
          <Tab key="active" title="Nadchodzące">
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
          </Tab>
          <Tab key="past" title="Zakończone">
            <ul className={styles.competitionsList}>
              <CompetitionCard
                color="#D4FF77"
                name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
                dateStart="2024-03-02"
                dateEnd="2024-03-03"
                location="Warszawa"
                entrantsConfirmed={15}
                entrantsTotal={20}
              />
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
                color="royalblue"
                name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
                dateStart="2024-03-02"
                dateEnd="2024-03-03"
                location="Warszawa"
                entrantsConfirmed={15}
                entrantsTotal={20}
              />
              <CompetitionCard
                color="yellow"
                name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
                dateStart="2024-03-02"
                dateEnd="2024-03-03"
                location="Warszawa"
                entrantsConfirmed={15}
                entrantsTotal={20}
              />
            </ul>
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
  entrantsTotal,
  entrantsConfirmed,
}) => {
  return (
    <div className={styles.competitionCardContainer}>
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
        <p className={styles.entrantsText}>
          {entrantsConfirmed}/{entrantsTotal}
        </p>
      </div>
    </div>
  );
};

export default CompetitionsPage;
