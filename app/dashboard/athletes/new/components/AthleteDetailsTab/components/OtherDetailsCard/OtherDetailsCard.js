import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card from '@/components/Card/Card';

import styles from './OtherDetailsCard.module.css';

const OtherDetailsCard = () => {
  return (
    <Card title="Inne">
      <EditModeContent />
    </Card>
  );
};

const EditModeContent = ({entries: savedEntries = []}) => {
  const [entries, setEntries] = useState(savedEntries);

  const {
    register,
    unregister,
    control,
    formState: {errors},
  } = useFormContext();

  const handleAddNewEntry = () => {
    // Check if there are empty entries
    // if (entries.some(entry => entry.key === '' || entry.value === '')) return;
    // setEntries([...entries, {id: v4(), key: '', value: ''}]);
  };

  return (
    <div>
      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <Entry
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

export default OtherDetailsCard;

const Entry = ({
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
      unregister(`other.${id}].key`);
      unregister(`other.${id}].value`);
    };
  }, [id]);

  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        {/* <Controller
          name={`other.${id}.key`}
          control={register}
          defaultValue={entryName}
          render={({field}) => (
            <Input
              label="Nazwa"
              placeholder="Np. Grupa krwi"
              isRequired
              isInvalid={!!errors?.other?.[id]?.key}
              {...field}
              onChange={e => {
                field.onChange(e);
                setEntries(prev =>
                  prev.map((entry, i) => (i === index ? {...entry, key: e.target.value} : entry))
                );
              }}
            />
          )}
        /> */}
        <Input
          label="Nazwa"
          placeholder="Np. Grupa krwi"
          defaultValue={entryName}
          isRequired
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, key: e.target.value} : entry))
            )
          }
          {...register(`other.${id}].key`, {
            required: true,
          })}
          isInvalid={!!errors?.other?.[id]?.key}
        />
      </div>
      <div className={styles.value}>
        <Input
          label="Wartość"
          placeholder="Np. A+"
          defaultValue={entryValue}
          onChange={e =>
            setEntries(prev =>
              prev.map((entry, i) => (i === index ? {...entry, value: e.target.value} : entry))
            )
          }
          {...register(`other.${id}].value`, {
            required: true,
          })}
          isInvalid={!!errors?.other?.[id]?.value}
          isRequired
          errorMessage={errors?.other?.[id]?.value?.message}
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
