'use client';

import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';

import {Button} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import DetailsCard from './components/DetailsCard/DetailsCard';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';
import ParticipantsCard from './components/ParticipantsCard/ParticipantsCard';

import styles from './CompetitionPage.module.css';

const GroupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleCancel = () => {
    // On cancel click go back to the previous page
    router.back();
  };

  return (
    <MainLayout>
      <ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.topPanel}>
            <PageTitle title="Nowe zawody" />
            <div className={styles.buttonsContainer}>
              <Button style={{backgroundColor: 'white'}} onClick={handleCancel}>
                Anuluj
              </Button>
              <Button type="submit" color="primary">
                Zapisz
              </Button>
            </div>
          </div>
          <div className={styles.grid}>
            <MainInfoCard
              className={styles.mainInfoCard}
              register={register}
              control={control}
              errors={errors}
            />
            <DetailsCard
              className={styles.detailsCard}
              register={register}
              control={control}
              errors={errors}
            />
            <ParticipantsCard className={styles.participantsCard} />
          </div>
        </form>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
