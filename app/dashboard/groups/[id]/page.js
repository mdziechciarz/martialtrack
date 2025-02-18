'use client';

import {MoreVertical24Filled} from '@/components/icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import CoachAssistantsCard from './components/CoachAssistantsCard/CoachAssistantsCard';
import MembersCard from './components/MembersCard/MembersCard.';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import SectionColorCard from './components/SectionColorCard/SectionColorCard';

import {redirect, useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {fetchGroupData} from '../actions';
import styles from './GroupPage.module.css';

// const groupData = {
//   name: 'Kickboxing Zawodnicy',
//   color: '#79dd36',
//   clubBranch: {id: 'x', name: 'Katowice'},
// };

const availableClubBranches = [
  {id: 'x', name: 'Katowice'},
  {id: 'd', name: 'Warszawa'},
  {id: 'c', name: 'Kraków'},
  {id: 'g', name: 'Wrocław'},
];

const GroupPage = () => {
  // Get id from url
  const {id} = useParams();

  console.log(id);

  const [groupData, setGroupData] = useState(null);

  const handleFetchGroupData = async () => {
    console.log('Fetching data');

    try {
      const groupData = await fetchGroupData(id);
      // setGroupData(groupData);
      setGroupData({
        name: groupData.name,
        color: groupData.color,
        clubBranch: {
          id: groupData.club_branches.id,
          name: groupData.club_branches.name,
        },
      });
      console.log('groupData', groupData);
    } catch (error) {
      console.error(error);
      redirect('/dashboard/groups');
    }
  };

  useEffect(() => {
    handleFetchGroupData();
  }, []);

  if (!groupData) {
    return (
      <MainLayout>
        <Spinner style={{marginTop: 350, marginLeft: 700}} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ContentContainer>
        <div className={styles.pageHeader}>
          <PageTitle
            title={groupData.name}
            className={styles.pageTitle}
            style={{borderLeftColor: groupData.color}}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreVertical24Filled />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="delete" className="text-danger" color="danger">
                Usuń grupę
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.grid}>
          <SectionColorCard
            className={styles.branchAndColorCard}
            color={groupData.color}
            clubBranches={availableClubBranches}
            clubBranch={groupData.clubBranch}
          />
          <CoachAssistantsCard className={styles.coachAndAssitantsCard} />
          <ScheduleCard className={styles.scheduleCard} />
          <MembersCard className={styles.athletesCard} />
        </div>
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
