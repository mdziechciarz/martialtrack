'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';

import {
  Delete16Filled,
  HomeAdd20Regular,
  MoreVertical24Filled,
  PeopleCommunityAdd20Filled,
  PersonAdd20Regular,
} from '@fluentui/react-icons';
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Ripple,
  Tooltip,
  useDisclosure,
  useRipple,
} from '@nextui-org/react';

import {createNewClubBranch, fetchClubBranchesAndGroups, removeClubBranch} from './actions';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import AddMemberModal from './components/AddMemberModal/AddMemberModal';
import CoachCard from './components/AvatarCard/CoachCard';
import NewBranchModal from './components/NewBranchModal/NewBranchModal';

import styles from './GroupsPage.module.css';

const GroupsPage = () => {
  const {
    isOpen: isBranchModalOpen,
    onOpen: onBranchModalOpen,
    onOpenChange: onBranchModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isAthleteModalOpen,
    onOpen: onAthleteModalOpen,
    onOpenChange: onAthleteModalOpenChange,
  } = useDisclosure();

  const [clubBranchesAndGroups, setClubBranchesAndGroups] = useState([]);

  const handleFetchClubBranchesAndGroups = async () => {
    const clubBranchesAndGroups = await fetchClubBranchesAndGroups();
    setClubBranchesAndGroups(clubBranchesAndGroups);
    console.log(clubBranchesAndGroups);
  };

  const handleCreateClubBranch = async clubBranchName => {
    await createNewClubBranch({clubBranchName});
    await handleFetchClubBranchesAndGroups();
  };

  const handleRemoveClubBranch = async clubBranchId => {
    console.log('Removing club branch with id:', clubBranchId);
    await removeClubBranch({clubBranchId});
    await handleFetchClubBranchesAndGroups();
  };

  useEffect(() => {
    handleFetchClubBranchesAndGroups();
  }, []);

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Grupy" />
        <div className={styles.buttonsContainer}>
          <Button
            onClick={onBranchModalOpen}
            endContent={<HomeAdd20Regular />}
            style={{backgroundColor: '#fff'}}
          >
            Nowa sekcja
          </Button>
          <Button color="primary" endContent={<PeopleCommunityAdd20Filled />}>
            Nowa grupa
          </Button>
          <NewBranchModal
            isOpen={isBranchModalOpen}
            onOpenChange={onBranchModalOpenChange}
            handleCreateClubBranch={handleCreateClubBranch}
          />
        </div>
        <AddMemberModal isOpen={isAthleteModalOpen} onOpenChange={onAthleteModalOpenChange} />
        <Accordion selectionMode="multiple" defaultExpandedKeys="all">
          {clubBranchesAndGroups.map(section => (
            <AccordionItem
              key={section.title}
              title={`${section.title} (${section.groups.length})`}
              classNames={{
                base: styles.accordionItemBase,
              }}
            >
              <ul className={styles.sectionContainer}>
                {section.groups.map(group => (
                  <GroupCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    color={group.color}
                    coach={group.coach}
                    members={group.members}
                    openingTimes={group.openingTimes}
                    onAddMemberClick={onAthleteModalOpen}
                  />
                ))}
              </ul>
              <Tooltip content="Usuń sekcję i jej grupy" delay={700}>
                <Button
                  variant="light"
                  isIconOnly
                  fullWidth
                  className={styles.deleteBranchButton}
                  onPress={() => handleRemoveClubBranch(section.id)}
                >
                  <Delete16Filled />
                </Button>
              </Tooltip>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupsPage;

const GroupCard = ({id, name, color, members, openingTimes, coach, onAddMemberClick}) => {
  const router = useRouter();

  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
    router.push(`/dashboard/groups/${id}`);
  };

  return (
    <li
      className={styles.groupCard}
      style={{borderLeftColor: color, position: 'relative', overflow: 'hidden'}}
      ref={domRef}
      onClick={handleClick}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
      <div className={styles.groupContentContainer}>
        <h3 className={styles.groupTitle}>{name}</h3>
        <CoachCard name={coach.name} imgSrc={coach.imgsrc} />
        <p>{members} zawodników</p>
        <p>{openingTimes}</p>
      </div>
      <div className={styles.groupButtonsContainer}>
        <AddMemberButton onClick={onAddMemberClick} />
        <OptionsButton onAddMemberClick={onAddMemberClick} />
      </div>
    </li>
  );
};

const AddMemberButton = ({onClick = () => {}}) => {
  return (
    <Tooltip content="Dodaj zawodnika" delay={700}>
      <Button onClick={onClick} className={styles.addMemberButton} variant="light" isIconOnly>
        <PersonAdd20Regular />
      </Button>
    </Tooltip>
  );
};

const OptionsButton = ({onAddMemberClick}) => {
  return (
    <Dropdown>
      <Tooltip content="Opcje" delay={700}>
        <div className="max-w-fit">
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <MoreVertical24Filled />
            </Button>
          </DropdownTrigger>
        </div>
      </Tooltip>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={onAddMemberClick} key="add">
          Dodaj zawodnika
        </DropdownItem>
        <DropdownItem key="edit">Edytuj grupę</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Usuń grupę
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
