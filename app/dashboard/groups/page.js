'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {
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
  Tooltip,
} from '@nextui-org/react';
import styles from './GroupsPage.module.css';
import CoachCard from './components/AvatarCard/CoachCard';

const example_sections = [
  {
    title: 'Sekcja Łazy',
    groups: [
      {
        id: 1,
        name: 'Kickboxing Dinusie',
        color: 'red',
        coach: {
          name: 'Jan Kowalski',
          imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        },
        openingTimes: 'Pon 16:00 - 18:00, Czw 16:00 - 18:00',
        members: 12,
      },
      {
        id: 2,
        name: 'Boks',
        color: 'blue',
        coach: {
          name: 'Karol Nowak',
          imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        },
        members: 5,
        openingTimes: 'Pon 18:00 - 20:00',
      },
      {
        id: 3,
        name: 'Kickboxing grupa zawodnicza',
        color: 'green',
        coach: {
          name: 'Szymon Kowalczyk',
          imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        },
        members: 10,
        openingTimes: 'Wto 16:00 - 18:00',
      },
    ],
  },
  {
    title: 'Sekcja Katowice',
    groups: [
      {
        id: 1,
        name: 'Grupa 1',
        color: 'yellow',
        coach: {
          name: 'Jan Kowalski',
          imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        },
        members: 5,
        openingTimes: 'Pon 16:00 - 18:00',
      },
      {
        id: 2,
        name: 'Grupa 2',
        color: 'orange',
        coach: {
          name: 'Karol Nowak',
          imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        },
        members: 7,
        openingTimes: 'Wto 16:00 - 18:00',
      },
    ],
  },
  {
    title: 'Sekcja Zawiercie',
    groups: [
      {
        id: 1,
        name: 'Grupa 1',
        color: 'black',
        coach: {name: 'Jan Kowalski', imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'},
        members: 15,
        openingTimes: 'Pon 16:00 - 18:00',
      },
    ],
  },
];

const GroupsPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Grupy" />
        <div className={styles.buttonsContainer}>
          <Button endContent={<HomeAdd20Regular />} style={{backgroundColor: '#fff'}}>
            Nowa sekcja
          </Button>
          <Button color="primary" endContent={<PeopleCommunityAdd20Filled />}>
            Nowa grupa
          </Button>
        </div>
        <Accordion selectionMode="multiple" defaultExpandedKeys="all">
          {example_sections.map(section => (
            <AccordionItem
              key={section.title}
              title={`${section.title} (${section.groups.length})`}
            >
              <ul className={styles.sectionContainer}>
                {section.groups.map(group => (
                  <GroupCard
                    key={group.id}
                    name={group.name}
                    color={group.color}
                    coach={group.coach}
                    members={group.members}
                    openingTimes={group.openingTimes}
                  />
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentContainer>
    </MainLayout>
  );
};

export default GroupsPage;

const GroupCard = ({name, color, members, openingTimes, coach}) => {
  return (
    <li className={styles.groupCard} style={{borderLeftColor: color}}>
      <div className={styles.groupContentContainer}>
        <h3 className={styles.groupTitle}>{name}</h3>
        <CoachCard name={coach.name} imgSrc={coach.imgsrc} />
        <p>{members} zawodników</p>
        <p>{openingTimes}</p>
      </div>
      <div className={styles.groupButtonsContainer}>
        <AddMemberButton />
        <OptionsButton />
      </div>
    </li>
  );
};

const AddMemberButton = ({onClick = () => {}}) => {
  return (
    <Tooltip content="Dodaj zawodnika" delay={700}>
      <Button className={styles.addMemberButton} variant="light" isIconOnly>
        <PersonAdd20Regular />
      </Button>
    </Tooltip>
  );
};

const OptionsButton = () => {
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
        <DropdownItem key="add">Dodaj zawodnika</DropdownItem>
        <DropdownItem key="edit">Edytuj grupę</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Usuń grupę
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
