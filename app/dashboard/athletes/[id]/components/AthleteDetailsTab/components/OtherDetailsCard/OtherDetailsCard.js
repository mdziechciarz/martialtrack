import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import styles from './OtherDetailsCard.module.css';

const exampleEntries = [
  {
    id: '123',
    label: 'Data przyjęcia',
    value: '2023-03-10',
  },
];

const OtherDetailsCard = () => {
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
      title="Inne"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
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
    <CardEntries
      entries={exampleEntries.reduce((result, item) => {
        result[item.label] = item.value;
        return result;
      }, {})}
    />
  );
};

const EditModeContent = ({register, unregister, errors, control, currentEntries}) => {
  const [entries, setEntries] = useState(currentEntries || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), label: '', value: ''}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`${id}`);
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
        label="Nazwa pola"
        placeholder="Np. Data przyjęcia"
        isRequired
        isInvalid={!!errors?.[id]?.label}
        defaultValue={label}
        {...register(`${id}.label`, {required: true})}
        validationBehavior="aria"
      />
      <Input
        label="Wartość"
        placeholder="Np. 2023-03-10"
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

export default OtherDetailsCard;
