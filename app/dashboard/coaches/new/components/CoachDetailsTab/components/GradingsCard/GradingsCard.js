import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './GradingsCard.module.css';

const GradingsCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    unregister,
  } = useFormContext();

  return (
    <Card title="Stopnie">
      <EditModeContent
        register={register}
        control={control}
        errors={errors}
        unregister={unregister}
      />
    </Card>
  );
};

const EditModeContent = ({register, unregister, errors, control, currentEntries}) => {
  const [entries, setEntries] = useState(currentEntries || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), label: '', value: ''}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`levels.${id}`);
  };

  return (
    <CardGrid oneColumn>
      {entries.map(entry => (
        <Entry
          key={entry.id}
          id={entry.id}
          handleRemoveEntry={() => handleRemoveEntry(entry.id)}
          label={entry.label}
          value={entry.value}
          register={register}
          errors={errors}
          control={control}
        />
      ))}
      <div className={styles.newEntryButtonContainer}>
        <AddNewEntryButton onClick={handleAddNewEntry} />
      </div>
    </CardGrid>
  );
};

const AddNewEntryButton = ({onClick}) => {
  return (
    <Button size="sm" fullWidth onClick={onClick} variant="light">
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

const Entry = ({id, handleRemoveEntry, register, errors, control, label, value}) => {
  return (
    <div className={styles.entry}>
      <Input
        label="Dyscyplina"
        placeholder="Np. Taekwondo"
        isRequired
        isInvalid={!!errors?.levels?.[id]?.label}
        defaultValue={label}
        {...register(`levels.${id}.label`, {required: true})}
      />
      <Input
        label="Stopień"
        placeholder="Np. III Dan"
        isRequired
        isInvalid={!!errors?.levels?.[id]?.value}
        defaultValue={value}
        {...register(`levels.${id}.value`, {required: true})}
      />
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

export default GradingsCard;
