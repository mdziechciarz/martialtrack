import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card from '@/components/Card/Card';

import styles from './GradingsCard.module.css';

const GradingsCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card title="Stopnie" isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <EditModeContent />
    </Card>
  );
};

const EditModeContent = ({entries: savedEntries = []}) => {
  const [entries, setEntries] = useState(savedEntries);

  const {
    register,
    unregister,
    formState: {errors},
  } = useFormContext();

  const handleAddNewEntry = () => {
    // Check if there are empty entries
    if (entries.some(entry => entry.key === '' || entry.value === '')) return;
    setEntries([...entries, {id: v4(), key: '', value: ''}]);
  };

  return (
    <div>
      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <GradingEntry
            key={entry.id}
            index={index}
            id={entry.id}
            setEntries={setEntries}
            entryName={entry.key}
            entryValue={entry.value}
            entries={entries}
            register={register}
            unregister={unregister}
            errors={errors}
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

const GradingEntry = ({
  id,
  index,
  entryName,
  entryValue,
  setEntries,
  entries,
  register,
  unregister,
  errors,
}) => {
  const handleRemoveEntry = () => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  useEffect(() => {
    return () => {
      unregister(`gradings.${id}].key`);
      unregister(`gradings.${id}].value`);
    };
  }, [id]);

  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          label="Dyscyplina"
          placeholder="Np. Taekwon-do"
          defaultValue={entryName}
          isRequired
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, key: e.target.value} : entry))
            )
          }
          {...register(`gradings.${id}].key`, {
            required: true,
          })}
          isInvalid={!!errors?.gradings?.[id]?.key}
        />
      </div>
      <div className={styles.value}>
        <Input
          label="Stopień"
          placeholder="Np. III Dan"
          defaultValue={entryValue}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, value: e.target.value} : entry))
            )
          }
          {...register(`gradings.${id}].value`, {
            required: true,
          })}
          isInvalid={!!errors?.gradings?.[id]?.value}
          isRequired
          errorMessage={errors?.gradings?.[id]?.value?.message}
        />
      </div>
      <RemoveEntryButton onClick={handleRemoveEntry} />
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
