'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Button} from '@nextui-org/react';

import {createNewCompetition} from '../actions';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import DetailsCard from './components/DetailsCard/DetailsCard';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';
import ParticipantsCard from './components/ParticipantsCard/ParticipantsCard';

import styles from './CompetitionPage.module.css';

const GroupPage = () => {
  const router = useRouter();

  const [participants, setParticipants] = useState([]);

  const handleAddParticipant = participant => {
    setParticipants(prev => [...prev, participant]);
  };

  const handleRemoveParticipant = participantId => {
    setParticipants(prev => prev.filter(participant => participant.athlete.id !== participantId));
  };

  const handleUpdateParticipant = participant => {
    setParticipants(prev => [
      ...prev.filter(p => p.athlete.id !== participant.athlete.id),
      participant,
    ]);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const handleCreateNewCompetition = async data => {
    await createNewCompetition(data);
    // console.log(data);
  };

  const onSubmit = data => {
    if (participants.length) data.participants = participants;

    handleCreateNewCompetition({
      name: data.name,
      color: data.color,
      location: data.location,
      level: data.level,
      description: data.description,
      link: data.link,
      participants: data.participants,
      date_start: data.date.start.toString(),
      date_end: data.date.end.toString(),
    });
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
            <ParticipantsCard
              className={styles.participantsCard}
              participants={participants}
              handleAddParticipant={handleAddParticipant}
              handleRemoveParticipant={handleRemoveParticipant}
              handleUpdateParticipant={handleUpdateParticipant}
            />
          </div>
        </form>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupPage;
