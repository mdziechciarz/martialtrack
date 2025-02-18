'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Button} from '@nextui-org/react';
import {toast, Toaster} from 'sonner';
import {inviteNewUser} from './actions';

const email = 'a.kowalski@gmail.com';

const SettingsPage = () => {
  const handleInviteUser = async () => {
    const response = await inviteNewUser({email, role: 'admin'});

    if (response.success) {
      toast.success('Użytkownik został zaproszony');
    } else {
      toast.error('Wystąpił błąd podczas zapraszania użytkownika');
    }
  };

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Ustawienia" />
        <Button onPress={handleInviteUser} color="primary">
          Zaproś użytkownika
        </Button>
        <Toaster richColors position="bottom-center" />
      </ContentContainer>
    </MainLayout>
  );
};

export default SettingsPage;
