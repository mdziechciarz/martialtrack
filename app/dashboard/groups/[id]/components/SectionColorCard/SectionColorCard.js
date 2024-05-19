import Card from '@/app/dashboard/athletes/[id]/AthleteDetailsView/components/Card/Card';
import {Select, SelectItem} from '@nextui-org/react';
import {useState} from 'react';
import styles from './SectionColorCard.module.css';

const SectionColorCard = ({clubBranches = [], color}) => {
  const [isEditable, setIsEditable] = useState(true);
  const [pickedColor, setPickeColor] = useState(color);

  return (
    <Card title="Sekcja i kolor">
      {isEditable ? (
        <EditableContent color={color} clubBranches={clubBranches} />
      ) : (
        <ReadOnlyContent color={color} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({color}) => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.entry}>
        <p className={styles.key}>Sekcja</p>
        <p className={styles.value}>Katowice</p>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Kolor</p>
        <input className={styles.colorInput} type="color" disabled defaultValue={color} />
      </div>
    </div>
  );
};

const EditableContent = ({color, clubBranches}) => {
  return (
    <div className={`${styles.contentContainer} ${styles.editable}`}>
      <div className={styles.entry}>
        <p className={styles.key}>Sekcja</p>
        <Select placeholder="Wybierz sekcję">
          {clubBranches.map(branch => (
            <SelectItem key={branch.id}>{branch.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Kolor</p>
        <input
          className={styles.colorInput}
          style={{cursor: 'pointer'}}
          type="color"
          defaultValue={color}
        />
      </div>
    </div>
  );
};

export default SectionColorCard;
