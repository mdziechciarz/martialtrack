import {parseDate} from '@internationalized/date';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, DatePicker, Input} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './LicensesCard.module.css';

// const exampleEntries = [
//   {
//     id: '123',
//     name: 'Badania lekarskie',
//     number: 'ARE/2017/124',
//     date: '2023-03-10',
//   },
//   {
//     id: '456',
//     name: 'Licencja PZKB',
//     number: 'WAE/2019/124',
//     date: '2024-07-24',
//   },
// ];
const exampleEntries = [
  {
    id: '123',
    name: 'Badania lekarskie',
    number: 'ARE/2017/124',
    date: parseDate('2023-03-10'),
  },
  {
    id: '456',
    name: 'Licencja PZKB',
    number: 'WAE/2019/124',
    date: parseDate('2024-07-24'),
  },
];

const LicensesCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    unregister,
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
      title="Badania i licencje"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      className={styles.card}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          control={control}
          errors={errors}
          unregister={unregister}
          currentEntries={exampleEntries}
        />
      ) : (
        <ReadOnlyContent />
      )}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return (
    <CardGrid oneColumn>
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
    </CardGrid>
  );
};

const EditModeContent = ({currentEntries = [], register, control, errors, unregister}) => {
  const [entries, setEntries] = useState(currentEntries || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), label: '', value: ''}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`${id}`);
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', rowGap: '12px'}}>
        {entries.map(entry => (
          <Entry
            key={entry.id}
            id={entry.id}
            licenseName={entry.name}
            licenseNumber={entry.number}
            licenseDate={entry.date}
            handleRemoveEntry={() => handleRemoveEntry(entry.id)}
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

const Entry = ({
  id,
  handleRemoveEntry,
  licenseName,
  licenseNumber,
  licenseDate,
  register,
  errors,
  control,
}) => {
  console.log(errors);

  return (
    <div className={`${styles.entry} ${styles.editMode}`}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          label="Nazwa badania/licencji"
          placeholder="Np. Badania lekarskie"
          size="sm"
          isRequired
          defaultValue={licenseName}
          isInvalid={!!errors?.[id]?.licenseName}
          {...register(`${id}].licenseName`, {
            required: true,
          })}
          validationBehavior="aria"
        />
      </div>
      <div style={{display: 'flex', columnGap: '4px'}}>
        <Input
          label="Numer"
          placeholder="Np. ARE/2017/124"
          defaultValue={licenseNumber}
          isInvalid={!!errors?.[id]?.licenseNumber}
          {...register(`${id}].licenseNumber`)}
          validationBehavior="aria"
        />
        <Controller
          control={control}
          name={`${id}].licenseDate`}
          rules={{required: true}}
          defaultValue={licenseDate}
          render={({field}) => (
            <DatePicker
              label="Data ważności"
              isRequired
              disableAnimation
              isInvalid={!!errors?.[id]?.licenseDate}
              validationBehavior="aria"
              {...field}
            />
          )}
        />
      </div>
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

const AddNewEntryButton = ({onClick}) => {
  return (
    <Button className={styles.addTimeButton} size="sm" fullWidth onPress={onClick} variant="light">
      <Add16Filled />
    </Button>
  );
};

const RemoveEntryButton = ({onClick}) => {
  return (
    <Button
      className={styles.removeEntryButton}
      size="sm"
      onPress={onClick}
      isIconOnly
      variant="light"
    >
      <Dismiss16Filled />
    </Button>
  );
};

export default LicensesCard;
