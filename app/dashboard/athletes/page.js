'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import AthletesTable from './components/AthletesTable/AthletesTable.';

const AthletesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zawodnicy" />
        {/* <div className={styles.buttonsContainer}>
          <Button
            className={styles.addAthleteButton}
            color="primary"
            endContent={<PersonAdd20Filled />}
          >
            Nowy zawodnik
          </Button>
        </div> */}
        <AthletesTable />
      </ContentContainer>
    </MainLayout>
  );
};

export default AthletesPage;
