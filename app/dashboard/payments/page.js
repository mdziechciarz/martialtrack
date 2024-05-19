'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const PaymentsPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Składki członkowskie" />
      </ContentContainer>
    </MainLayout>
  );
};

export default PaymentsPage;
