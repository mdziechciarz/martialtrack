'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const CoachesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Trenerzy" />
      </ContentContainer>
    </MainLayout>
  );
};

export default CoachesPage;
