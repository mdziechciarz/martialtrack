import Card from '@/components/Card/Card';
import {PeopleCommunityAdd20Filled} from '@fluentui/react-icons';
import {Button, useDisclosure} from '@nextui-org/react';
import styles from './GroupsCard.module.css';
import NewGroupModal from './components/NewGroupModal/NewGroupModal';

const GroupsCard = ({className = '', groups = []}) => {
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
      </div>
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
      <p className={styles.coachName}>Trener: {coachName}</p>
      <p className={styles.days}>{days}</p>
      <p className={styles.hours}>{hours}</p>
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
