import {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, DatePicker, Input} from '@nextui-org/react';

import Card from '@/components/Card/Card';

import styles from './LicensesCard.module.css';

const LicensesCard = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    unregister,
  } = useFormContext();

  return (
    <Card title="Badania i licencje">
      <EditModeContent
        register={register}
        control={control}
        errors={errors}
        unregister={unregister}
      />
    </Card>
  );
};

const EditModeContent = ({currentEntries = [], register, control, errors, unregister}) => {
  const [entries, setEntries] = useState(currentEntries || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), label: '', value: ''}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`licenses.${id}`);
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
  return (
    <div className={`${styles.entry} ${styles.editMode}`}>
      <div className={styles.key} style={{marginBottom: 4}}>
        <Input
          label="Nazwa badania/licencji"
          placeholder="Np. Badania lekarskie"
          size="sm"
          isRequired
          defaultValue={licenseName}
          isInvalid={!!errors?.licenses?.[id]?.licenseName}
          {...register(`licenses.${id}].licenseName`, {
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
          isInvalid={!!errors?.licenses?.[id]?.licenseNumber}
          {...register(`licenses.${id}].licenseNumber`)}
          validationBehavior="aria"
        />
        <Controller
          control={control}
          name={`licenses.${id}].licenseDate`}
          rules={{required: true}}
          defaultValue={licenseDate}
          render={({field}) => (
            <DatePicker
              label="Data ważności"
              isRequired
              disableAnimation
              isInvalid={!!errors?.licenses?.[id]?.licenseDate}
              {...field}
              validationBehavior="aria"
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

export default LicensesCard;
