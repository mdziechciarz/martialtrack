import Card, {CardEntries} from '@/components/Card/Card';
import {useEffect, useState} from 'react';

import {Add16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';
import styles from './GradingsCard.module.css';

const GradingsCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  // const [grades, setGrades] = useState([]);

  return (
    <Card title="Stopnie" isEditable isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      {isEditMode ? (
        <EditModeContent
          entries={[
            {key: 'Kickboxing', value: 'U3'},
            {key: 'Taekwondo', value: '4 cup'},
          ]}
        />
      ) : (
        <ReadOnlyContent />
      )}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return (
    <CardEntries
      entries={{
        Kickboxing: 'U3',
        Taekwondo: '4 cup',
      }}
    />
  );
};

const EditModeContent = ({entries: savedEntries = []}) => {
  const [entries, setEntries] = useState(savedEntries);

  const [currentlyEditedEntry, setCurrentlyEditedEntry] = useState(null);

  const handleDeactivate = event => {
    if (!event.target.closest(`.${styles.entry}`)) {
      setCurrentlyEditedEntry(null);
      // Filter out empty entries
      // setEntries(entries.filter(entry => entry.key !== '' || entry.value !== ''));
    }
  };

  useEffect(() => {
    if (currentlyEditedEntry !== null) {
      document.addEventListener('mousedown', handleDeactivate);
    } else {
      document.removeEventListener('mousedown', handleDeactivate);
    }

    return () => {
      document.removeEventListener('mousedown', handleDeactivate);
    };
  }, [currentlyEditedEntry]);

  const handleAddNewEntry = () => {
    setEntries([...entries, {key: '', value: ''}]);
    setCurrentlyEditedEntry(entries.length);
  };

  return (
    <div>
      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <GradingEntry
            key={index}
            entryName={entry.key}
            entryValue={entry.value}
            isEditMode={currentlyEditedEntry === index}
            handleEdit={() => setCurrentlyEditedEntry(index)}
          />
        ))}
      </div>
      <div className={styles.newEntryButtonContainer}>
        <AddNewEntryButton onClick={handleAddNewEntry} styles={{marginTop: 16}} />
      </div>
    </div>
  );
};

export default GradingsCard;

// Three modes: NoValue (AddNewButton), EditingMode, ReadMode

const GradingEntry = ({isEditMode, handleEdit, entryName, entryValue}) => {
  if (isEditMode)
    return (
      <div className={styles.entry}>
        <div className={styles.key} style={{marginBottom: 4}}>
          <Input placeholder="Taekwon-do" size="sm" />
        </div>
        <div className={styles.value}>
          <Input placeholder="III Dan" />
        </div>
      </div>
    );

  return (
    <div style={{cursor: 'pointer'}} className={styles.entry} onClick={handleEdit}>
      <p className={styles.key}>{entryName}</p>
      <p className={styles.value}>{entryValue}</p>
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
