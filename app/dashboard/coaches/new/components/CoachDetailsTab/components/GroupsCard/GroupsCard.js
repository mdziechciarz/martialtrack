import {PeopleCommunityAdd20Filled} from '@fluentui/react-icons';
import {Button, useDisclosure} from '@nextui-org/react';
import Card from '../Card/Card';
import styles from './GroupsCard.module.css';
import NewGroupModal from './components/NewGroupModal/NewGroupModal';

const GroupsCard = ({className = '', groupsAsCoach = [], groupsAsAssistant = []}) => {
  const {
    isOpen: isNewGroupModalOpen,
    onOpen: onNewGroupModalOpen,
    onOpenChange: onNewGroupModalOpenChange,
  } = useDisclosure();

  return (
    <Card title="Grupy" className={className}>
      <p className={styles.functionInGroups}>Trener grup:</p>
      <ul className={styles.groupsList}>
        {groupsAsCoach.map(({id, color, groupName, coachName, days, hours}) => (
          <GroupTile key={id} color={color} groupName={groupName} days={days} hours={hours} />
        ))}
      </ul>
      <p className={styles.functionInGroups}>Asystent w grupach:</p>
      <ul className={styles.groupsList}>
        {groupsAsAssistant.map(({id, color, groupName, coachName, days, hours}) => (
          <GroupTile
            key={id}
            color={color}
            groupName={groupName}
            coachName={coachName}
            days={days}
            hours={hours}
          />
        ))}
      </ul>
      <NewGroupModal isOpen={isNewGroupModalOpen} onOpenChange={onNewGroupModalOpenChange} />
      <NewGroupButton onClick={onNewGroupModalOpen} />
    </Card>
  );
};

const GroupTile = ({color, groupName, coachName, days, hours}) => {
  return (
    <li
      className={styles.groupTileContainer}
      style={{
        borderLeftColor: color,
      }}
    >
      <h5 className={styles.groupName}>{groupName}</h5>
      {coachName && <p className={styles.coachName}>Trener: {coachName}</p>}
      <p className={styles.days}>{days}</p>
      <p className={styles.hours}>{hours}</p>
    </li>
  );
};

const NewGroupButton = ({onClick} = () => {}) => (
  <Button
    className={styles.newGroupButton}
    color="secondary"
    endContent={<PeopleCommunityAdd20Filled />}
    fullWidth
    onClick={onClick}
  >
    Dodaj do nowej grupy
  </Button>
);

export default GroupsCard;
