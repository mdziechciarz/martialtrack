'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import AttendanceSection from './components/AttendanceSection/AttendanceSection';
import PageDescription from './components/PageDescription/PageDescription';

const AttendancePage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Listy obecności" />
        <PageDescription text="Wybierz trening aby wyświetlić lub wypelnić obecność" />
        <AttendanceSection />
      </ContentContainer>
    </MainLayout>
  );
};

export default AttendancePage;
