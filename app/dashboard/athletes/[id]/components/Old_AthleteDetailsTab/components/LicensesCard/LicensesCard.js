import Card from '@/components/Card/Card';
import {useState} from 'react';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, DatePicker, Input} from '@nextui-org/react';
import styles from './LicensesCard.module.css';

const LicensesCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      title="Badania i licencje"
      isEditable
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      className={styles.card}
    >
      {isEditMode ? (
        <EditModeContent entries={[{key: 'Data przyjęcia', value: '2021-01-01'}]} />
      ) : (
        <ReadOnlyContent />
      )}
    </Card>
  );
};

const ReadOnlyContent = () => {
  // return <CardEntries entries={{'Data przyjęcia': '2021-01-01'}} />;
  return (
    <div style={{display: 'flex', flexDirection: 'column', rowGap: '8px'}}>
      <div className={styles.entry}>
        <p className={styles.key}>Badania lekarskie</p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px'}}>
          <p className={styles.value}>ARE/2017/124</p>
          <p className={styles.value}>Ważne do: 2023-12-24</p>
        </div>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Licencja PZKB</p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px'}}>
          <p className={styles.value}>WAE/2019/124</p>
          <p className={styles.value}>Ważne do: 2024-07-24</p>
        </div>
      </div>
    </div>
  );
};

const EditModeContent = ({entries: savedEntries = []}) => {
  const [entries, setEntries] = useState(savedEntries);

  const handleAddNewEntry = () => {
    // Check if there are empty entries
    if (entries.some(entry => entry.key === '' || entry.value === '')) return;
    setEntries([...entries, {key: '', value: ''}]);
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', rowGap: '12px'}}>
        {entries.map((entry, index) => (
          <Entry
            key={index}
            index={index}
            setEntries={setEntries}
            entryName={entry.key}
            entryValue={entry.value}
          />
        ))}
      </div>
      <div className={styles.newEntryButtonContainer}>
        <AddNewEntryButton onClick={handleAddNewEntry} styles={{marginTop: 16}} />
      </div>
    </div>
  );
};

export default LicensesCard;

const Entry = ({index, entryName, entryValue, setEntries}) => {
  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          label="Nazwa badania/licencji"
          placeholder="Np. Badania lekarskie"
          size="sm"
          defaultValue={entryName}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, key: e.target.value} : entry))
            )
          }
        />
      </div>
      <div style={{display: 'flex', columnGap: '4px'}}>
        <Input
          label="Numer"
          placeholder="Np. ARE/2017/124"
          defaultValue={entryValue}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, value: e.target.value} : entry))
            )
          }
        />
        <DatePicker label="Data ważności" disableAnimation />
      </div>
      <RemoveEntryButton />
    </div>
  );
};

const AddNewEntryButton = ({onClick}) => {
  return (
    <Button className={styles.addTimeButton} size="sm" fullWidth onClick={onClick} variant="light">
      <Add16Filled />
    </Button>
  );
};

const RemoveEntryButton = ({onClick}) => {
  return (
    <Button
      className={styles.removeEntryButton}
      size="sm"
      onClick={onClick}
      isIconOnly
      variant="light"
    >
      <Dismiss16Filled />
    </Button>
  );
};
