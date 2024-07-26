import Card, {CardEntries} from '@/components/Card/Card';
import {useState} from 'react';

import {Add16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';
import styles from './OtherDetailsCard.module.css';

const OtherDetailsCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card title="Inne" isEditable isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      {isEditMode ? (
        <EditModeContent entries={[{key: 'Data przyjęcia', value: '2021-01-01'}]} />
      ) : (
        <ReadOnlyContent />
      )}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return <CardEntries entries={{'Data przyjęcia': '2021-01-01'}} />;
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
      <div className={styles.grid}>
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

export default OtherDetailsCard;

const Entry = ({index, entryName, entryValue, setEntries}) => {
  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          placeholder="Nazwa"
          size="sm"
          defaultValue={entryName}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, key: e.target.value} : entry))
            )
          }
        />
      </div>
      <div className={styles.value}>
        <Input
          placeholder="Wartość"
          defaultValue={entryValue}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, value: e.target.value} : entry))
            )
          }
        />
      </div>
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
