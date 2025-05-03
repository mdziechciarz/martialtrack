import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Add16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card, {CardEntries} from '@/components/Card/Card';

import styles from './GradingsCard.module.css';

const GradingsCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log('Changes saved');
    console.log(data);
    reset();
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    reset();
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      title="Stopnie"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
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

  const handleAddNewEntry = () => {
    // Check if there are empty entries
    if (entries.some(entry => entry.key === '' || entry.value === '')) return;
    setEntries([...entries, {key: '', value: ''}]);
  };

  return (
    <div>
      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <GradingEntry
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

export default GradingsCard;

const GradingEntry = ({index, entryName, entryValue, setEntries}) => {
  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          placeholder="Np. Taekwon-do"
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
          placeholder="Np. III Dan"
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
