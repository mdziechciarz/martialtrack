'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import styles from './GroupPage.module.css';
import CoachAssistantsCard from './components/CoachAssistantsCard/CoachAssistantsCard';
import MembersCard from './components/MembersCard/MembersCard.';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import SectionColorCard from './components/SectionColorCard/SectionColorCard';

const groupData = {
  name: 'Kickboxing Zawodnicy',
  color: '#79dd36',
};

const availableClubBranches = [
  {id: 1, name: 'Katowice'},
  {id: 2, name: 'Warszawa'},
  {id: 3, name: 'Kraków'},
  {id: 4, name: 'Wrocław'},
];

const GroupPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle
          title="Kickboxing Zawodnicy"
          className={styles.pageTitle}
          style={{borderLeftColor: groupData.color}}
        />
        <div className={styles.grid}>
          <SectionColorCard
            className={styles.branchAndColorCard}
            color={groupData.color}
            clubBranches={availableClubBranches}
          />
          <CoachAssistantsCard className={styles.coachAndAssitantsCard} />
          <ScheduleCard className={styles.scheduleCard} />
          <MembersCard className={styles.athletesCard} />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
