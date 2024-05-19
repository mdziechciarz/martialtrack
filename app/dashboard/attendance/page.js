'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const AttendancePage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Listy obecności" />
      </ContentContainer>
    </MainLayout>
  );
};

export default AttendancePage;
