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
import {useState} from 'react';
import NewGroupModal from './components/NewGroupModal/NewGroupModal';

import styles from './GroupsCard.module.css';
// import {removeAthleteFromGroup} from '../../../../actions/updateAthlete';
import {removeCoachAsAssistantFromGroup} from '../../../../actions/updateCoach';

const GroupsCard = ({
  className = '',
  groupsAsCoach = [],
  groupsAsAssistant = [],
  refetchCoachData,
  coachId,
}) => {
  const {
    isOpen: isNewGroupModalOpen,
    onOpen: onNewGroupModalOpen,
    onOpenChange: onNewGroupModalOpenChange,
  } = useDisclosure();

  return (
    <Card title="Grupy" className={className}>
      <div className={styles.contentContainer}>
        <p className={styles.functionInGroups}>Trener grup:</p>
        <ul className={styles.groupsList}>
          {groupsAsCoach.map(({id, color, groupName, coachName, days, hours}) => (
            <GroupTile
              gorupId={id}
              coachId={coachId}
              key={id}
              color={color}
              groupName={groupName}
              days={days}
              hours={hours}
              refetchCoachData={refetchCoachData}
            />
          ))}
        </ul>
        <p className={styles.functionInGroups}>Asystent w grupach:</p>
        <ul className={styles.groupsList}>
          {groupsAsAssistant.map(({id, color, groupName, coachName, days, hours}) => (
            <GroupTile
              coachId={coachId}
              groupId={id}
              key={id}
              color={color}
              groupName={groupName}
              coachName={coachName}
              days={days}
              hours={hours}
              isRemovable
              refetchCoachData={refetchCoachData}
            />
          ))}
        </ul>
        <NewGroupModal
          isOpen={isNewGroupModalOpen}
          onOpenChange={onNewGroupModalOpenChange}
          coachId={coachId}
          refetchCoachData={refetchCoachData}
        />
        <NewGroupButton onClick={onNewGroupModalOpen} />
      </div>
    </Card>
  );
};

const GroupTile = ({
  coachId,
  groupId,
  refetchCoachData,
  color,
  groupName,
  coachName,
  days,
  hours,
  isRemovable = false,
}) => {
  const [isRemovingFromGroup, setIsRemovingFromGroup] = useState(false);

  const handleRemoveCoachAsAssistantFromGroup = async () => {
    try {
      setIsRemovingFromGroup(true);

      const {success} = await removeCoachAsAssistantFromGroup({
        coachId,
        groupId,
      });
      if (success) {
        refetchCoachData();
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
      {isRemovable && (
        <Dropdown>
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
            <DropdownItem
              startContent={<Dismiss16Filled />}
              onPress={handleRemoveCoachAsAssistantFromGroup}
            >
              Usuń z grupy
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <h5 className={styles.groupName}>{groupName}</h5>
      {coachName && <p className={styles.coachName}>Trener: {coachName}</p>}
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
