import Card from '@/components/Card/Card';
import {
  Dismiss16Filled,
  MoreVertical16Filled,
  PeopleCommunityAdd20Filled,
} from '@fluentui/react-icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import NewGroupModal from './components/NewGroupModal/NewGroupModal';

import {removeAthleteFromGroup} from '../../../../actions/updateAthlete';

import {useState} from 'react';
import styles from './GroupsCard.module.css';

const GroupsCard = ({className = '', groups = [], refetchAthleteData, athleteId}) => {
  const {
    isOpen: isNewGroupModalOpen,
    onOpen: onNewGroupModalOpen,
    onOpenChange: onNewGroupModalOpenChange,
  } = useDisclosure();

  return (
    <Card title="Grupy" className={className}>
      <div className={styles.contentContainer}>
        <ul className={styles.groupsList}>
          {groups.map(({id, color, groupName, coachName, days, hours}) => (
            <GroupTile
              athleteId={athleteId}
              groupId={id}
              key={id}
              color={color}
              groupName={groupName}
              coachName={coachName}
              days={days}
              refetchAthleteData={refetchAthleteData}
              // hours={hours}
            />
          ))}
        </ul>
        <NewGroupModal
          isOpen={isNewGroupModalOpen}
          onOpenChange={onNewGroupModalOpenChange}
          athleteId={athleteId}
          refetchAthleteData={refetchAthleteData}
        />
        <NewGroupButton onClick={onNewGroupModalOpen} />
      </div>
    </Card>
  );
};

const GroupTile = ({
  athleteId,
  groupId,
  refetchAthleteData,
  color,
  groupName,
  coachName,
  days,
  hours,
}) => {
  const [isRemovingFromGroup, setIsRemovingFromGroup] = useState(false);

  const handleRemoveAthleteFromGroup = async () => {
    try {
      setIsRemovingFromGroup(true);

      const {success} = await removeAthleteFromGroup({
        athleteId,
        groupId,
      });
      if (success) {
        refetchAthleteData();
      } else {
        console.error('Failed to remove athlete from group');
      }
    } catch (error) {
      console.error('Error removing athlete from group:', error);
    } finally {
      setIsRemovingFromGroup(false);
    }
  };

  return (
    <li
      className={styles.groupTileContainer}
      style={{
        borderLeftColor: color,
      }}
    >
      <Dropdown
      // placement="bottom-end"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            className={styles.groupTileOptionsButton}
            variant="light"
            size="sm"
            isDisabled={isRemovingFromGroup}
          >
            <MoreVertical16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem startContent={<Dismiss16Filled />} onPress={handleRemoveAthleteFromGroup}>
            Usuń z grupy
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <h5 className={styles.groupName}>{groupName}</h5>
      <p className={styles.coachName}>Trener: {coachName}</p>
      <p className={styles.days}>{days}</p>
      {/* <p className={styles.hours}>{hours}</p> */}
    </li>
  );
};

const NewGroupButton = ({onClick = () => {}}) => (
  <div className={styles.newGroupButtonContainer}>
    <Button
      onPress={onClick}
      color="secondary"
      fullWidth
      endContent={<PeopleCommunityAdd20Filled />}
    >
      Dodaj do nowej grupy
    </Button>
  </div>
);

export default GroupsCard;
