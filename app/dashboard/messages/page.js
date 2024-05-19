'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const MessagesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Wiadomości" />
      </ContentContainer>
    </MainLayout>
  );
};

export default MessagesPage;
