import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import {updateCoachLevels} from '../../../../actions/updateCoach';

import styles from './GradingsCard.module.css';

const GradingsCard = ({coachId, refetchCoachData, levels = []}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    unregister,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    try {
      setIsSaving(true);

      const {success} = await updateCoachLevels({
        id: coachId,
        levels: Object.values(data),
      });

      if (success) {
        console.log('Changes saved successfully');
        refetchCoachData();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
      reset();
      setIsEditMode(false);
    }
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
      isSaving={isSaving}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          control={control}
          errors={errors}
          unregister={unregister}
          currentLevels={levels?.map(item => ({
            id: v4(),
            key: item.key,
            value: item.value,
          }))}
        />
      ) : (
        <ReadOnlyContent levels={levels} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({levels = []}) => {
  return (
    <CardEntries
      entries={levels?.reduce((result, item) => {
        result[item.key] = item.value;
        return result;
      }, {})}
    />
  );
};

const EditModeContent = ({register, unregister, errors, control, currentLevels}) => {
  const [entries, setEntries] = useState(currentLevels || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), key: '', value: ''}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`${id}`);
  };

  return (
    <CardGrid oneColumn>
      {entries?.map(entry => (
        <Entry
          key={entry.id}
          id={entry.id}
          handleRemoveEntry={() => handleRemoveEntry(entry.id)}
          label={entry.key}
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
    <Button size="sm" fullWidth onPress={onClick} variant="light">
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

const Entry = ({id, handleRemoveEntry, register, errors, control, label, value}) => {
  return (
    <div className={styles.entry}>
      <Input
        label="Dyscyplina"
        placeholder="Np. Taekwondo"
        isRequired
        isInvalid={!!errors?.[id]?.key}
        defaultValue={label}
        {...register(`${id}.key`, {required: true})}
        validationBehavior="aria"
      />
      <Input
        label="Stopień"
        placeholder="Np. III Dan"
        isRequired
        isInvalid={!!errors?.[id]?.value}
        defaultValue={value}
        {...register(`${id}.value`, {required: true})}
        validationBehavior="aria"
      />
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

export default GradingsCard;
