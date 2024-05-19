'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const SchedulePage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Harmonogram zajęć" />
      </ContentContainer>
    </MainLayout>
  );
};

export default SchedulePage;
