'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

const SettingsPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Dotacje" />
      </ContentContainer>
    </MainLayout>
  );
};

export default SettingsPage;
