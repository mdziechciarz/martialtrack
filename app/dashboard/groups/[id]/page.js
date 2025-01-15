'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {MoreVertical24Filled} from '@fluentui/react-icons';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/react';
import CoachAssistantsCard from './components/CoachAssistantsCard/CoachAssistantsCard';
import MembersCard from './components/MembersCard/MembersCard.';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import SectionColorCard from './components/SectionColorCard/SectionColorCard';

import styles from './GroupPage.module.css';

const groupData = {
  name: 'Kickboxing Zawodnicy',
  color: '#79dd36',
  clubBranch: {id: 'x', name: 'Katowice'},
};

const availableClubBranches = [
  {id: 'x', name: 'Katowice'},
  {id: 'd', name: 'Warszawa'},
  {id: 'c', name: 'Kraków'},
  {id: 'g', name: 'Wrocław'},
];

const GroupPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <div className={styles.pageHeader}>
          <PageTitle
            title="Kickboxing Zawodnicy"
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
