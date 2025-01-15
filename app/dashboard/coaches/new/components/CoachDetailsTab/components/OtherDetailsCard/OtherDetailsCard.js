import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './OtherDetailsCard.module.css';

const OtherDetailsCard = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    unregister,
  } = useFormContext();

  return (
    <Card title="Inne">
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
    unregister(`other.${id}`);
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
        label="Nazwa pola"
        placeholder="Np. Data przyjęcia"
        isRequired
        isInvalid={!!errors?.other?.[id]?.label}
        defaultValue={label}
        {...register(`other.${id}.label`, {required: true})}
      />
      <Input
        label="Wartość"
        placeholder="Np. 2023-03-10"
        isRequired
        isInvalid={!!errors?.other?.[id]?.value}
        defaultValue={value}
        {...register(`other.${id}.value`, {required: true})}
      />
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

export default OtherDetailsCard;
