import {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

import Card from '@/components/Card/Card';
import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, DatePicker, Input} from '@nextui-org/react';
import styles from './LicensesCard.module.css';

const LicensesCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card
      title="Badania i licencje"
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      className={styles.card}
    >
      {isEditMode ? <EditModeContent /> : <ReadOnlyContent />}
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

  const {
    register,
    unregister,
    control,
    formState: {errors},
  } = useFormContext();

  const handleAddNewEntry = () => {
    // Check if there are empty entries
    if (entries.some(entry => entry.key === '' || entry.date === '')) return;
    setEntries([...entries, {id: v4(), key: '', value: '', date: ''}]);
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', rowGap: '12px'}}>
        {entries.map((entry, index) => (
          <Entry
            key={entry.id}
            id={entry.id}
            index={index}
            setEntries={setEntries}
            entryName={entry.key}
            entryValue={entry.value}
            register={register}
            errors={errors}
            control={control}
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

const Entry = ({id, index, entryName, entryValue, setEntries, register, errors, control}) => {
  const handleRemoveEntry = () => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.entry}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          label="Nazwa badania/licencji"
          placeholder="Np. Badania lekarskie"
          size="sm"
          isRequired
          // defaultValue={entryName}
          onChange={e =>
            setEntries(prev =>
              prev.map(entry => (entry.id === id ? {...entry, key: e.target.value} : entry))
            )
          }
          register={register(`licenses.${id}].key`, {
            required: true,
          })}
          isInvalid={!!errors?.licenses?.[id]?.key}
        />
      </div>
      <div style={{display: 'flex', columnGap: '4px'}}>
        <Input
          label="Numer (opcjonalnie)"
          placeholder="Np. ARE/2017/124"
          defaultValue={entryValue}
          onChange={e =>
            setEntries(prev =>
              prev.map(entry => (entry.id === id ? {...entry, value: e.target.value} : entry))
            )
          }
          register={register(`licenses.${id}].value`)}
          isInvalid={!!errors?.licenses?.[id]?.value}
        />
        <Controller
          control={control}
          name={`licenses.${id}].date`}
          rules={{required: true}}
          render={({field}) => (
            <DatePicker
              label="Data ważności"
              isRequired
              disableAnimation
              // onChange={field.onChange}
              onChange={date => {
                field.onChange(date);
                setEntries(prev =>
                  prev.map(entry => (entry.id === id ? {...entry, date: date} : entry))
                );
              }}
              value={field.value}
              isInvalid={!!errors?.licenses?.[id]?.date}
            />
          )}
        />
        {/* <DatePicker
          label="Data ważności"
          isRequired
          disableAnimation
          onChange={date =>
            setEntries(prev =>
              prev.map(entry => (entry.id === id ? {...entry, date: date} : entry))
            )
          }
          register={register(`licenses.${id}].date`, {
            required: true,
          })}
          isInvalid={!!errors?.licenses?.[id]?.date}
        /> */}
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
