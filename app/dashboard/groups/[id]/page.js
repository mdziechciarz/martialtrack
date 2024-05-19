'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import Card from '../../athletes/[id]/AthleteDetailsView/components/Card/Card';
import styles from './GroupPage.module.css';
import CoachAssistantsCard from './components/CoachAssistantsCard/CoachAssistantsCard';
import MembersCard from './components/MembersCard/MembersCard.';
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
          <Card
            className={styles.scheduleCard}
            title="Harmonogram zajęć"
            entries={{
              Poniedziałek: '16:00 - 17:00',
              Wtorek: '16:00 - 17:00',
              Środa: '16:00 - 17:00',
            }}
          />
          <MembersCard className={styles.athletesCard} />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
