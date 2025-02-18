'use client';

import {Button} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import CoachAssistantsCard from './components/CoachAssistantsCard/CoachAssistantsCard';
import MainInfoCard from './components/MainInfoCard/MainInfoCard';
import MembersCard from './components/MembersCard/MembersCard.';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';

import {createNewGroup, fetchAvailableCoachesAndClubBranches} from '../actions';

import {useEffect, useState} from 'react';
import styles from './GroupPage.module.css';

const GroupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    unregister,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    createNewGroup({
      groupName: data.name,
      clubBranchId: data.clubBranch,
      color: data.color,
      coachId: data.coach,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const [availableClubBranches, setAvailableClubBranches] = useState([]);
  const [availableCoaches, setAvailableCoaches] = useState([]);

  const handleFetchCoachesAndClubBranches = async () => {
    const {clubBranches, coaches} = await fetchAvailableCoachesAndClubBranches();
    setAvailableClubBranches(clubBranches);
    setAvailableCoaches(coaches);
  };

  useEffect(() => {
    handleFetchCoachesAndClubBranches();
  }, []);

  // const handleCreateGroup = ({}) => {};

  return (
    <MainLayout>
      <ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.topPanel}>
            <PageTitle title="Nowa grupa" />
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
              className={styles.branchAndColorCard}
              clubBranches={availableClubBranches}
              register={register}
              control={control}
              errors={errors}
            />
            <CoachAssistantsCard
              className={styles.coachAndAssitantsCard}
              availableCoaches={availableCoaches}
              register={register}
              control={control}
              errors={errors}
            />
            <ScheduleCard
              className={styles.scheduleCard}
              register={register}
              control={control}
              errors={errors}
              unregister={unregister}
            />
            <MembersCard className={styles.athletesCard} />
          </div>
        </form>
      </ContentContainer>
    </MainLayout>
  );
};
// const GroupPage = () => {
//   return (
//     <MainLayout>
//       <ContentContainer>
//         <PageTitle
//           title="Kickboxing Zawodnicy"
//           className={styles.pageTitle}
//           style={{borderLeftColor: groupData.color}}
//         />
//         <div className={styles.grid}>
//           <SectionColorCard
//             className={styles.branchAndColorCard}
//             color={groupData.color}
//             clubBranches={availableClubBranches}
//           />
//           <CoachAssistantsCard className={styles.coachAndAssitantsCard} />
//           <ScheduleCard className={styles.scheduleCard} />
//           <MembersCard className={styles.athletesCard} />
//         </div>
//       </ContentContainer>
//     </MainLayout>
//   );
// };

export default GroupPage;
