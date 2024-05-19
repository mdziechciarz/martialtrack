'use client';

import Button from '@/components/Button/Button';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import styles from './AthletesPage.module.css';

const AthletesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zawodnicy" />
        <Button
          text="Nowy zawodnik"
          // icon={ReceiptAdd20Filled}
          className={styles.addCompetitionButton}
        />
      </ContentContainer>
    </MainLayout>
  );
};

export default AthletesPage;
