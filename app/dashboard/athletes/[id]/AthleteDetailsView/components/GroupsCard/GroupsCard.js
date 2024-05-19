import Button from '@/components/Button/Button';
import {PeopleCommunityAdd20Filled} from '@fluentui/react-icons';
import Card from '../Card/Card';
import styles from './GroupsCard.module.css';

const GroupsCard = ({groups = []}) => {
  return (
    <Card title="Grupy">
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
      <NewGroupButton />
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

const NewGroupButton = () => (
  <Button
    className={styles.newGroupButton}
    secondary
    text="Dodaj do nowej grupy"
    icon={PeopleCommunityAdd20Filled}
  />
);

export default GroupsCard;
