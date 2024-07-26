'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import AthletesTable from './components/AthletesTable/AthletesTable.';

import styles from './AthletesPage.module.css';

const AthletesPage = () => {
  return (
    <MainLayout>
      <ContentContainer className={styles.container}>
        <PageTitle title="Zawodnicy" />
        <AthletesTable />
      </ContentContainer>
    </MainLayout>
  );
};

export default AthletesPage;
