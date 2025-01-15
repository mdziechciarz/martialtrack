import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Input, Textarea} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import styles from './DetailsCard.module.css';

const DetailsCard = ({className, description, website}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = handleSubmit(data => {
    console.log(data);
    console.log('Changes saved');
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    setIsEditMode(false);
  };

  return (
    <Card
      className={`${styles.detailsCard} ${className || ''}`}
      title="Informacje dodatkowe"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
      {isEditMode ? (
        <EditModeContent
          description={description}
          website={website}
          register={register}
          errors={errors}
        />
      ) : (
        <ReadOnlyContent description={description} website={website} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({description, website}) => {
  return (
    <CardEntries
      // nonTextValues
      style={{gridTemplateColumns: '1fr'}}
      entries={{
        'Opis zawodów': description,
        'Adres internetowy': website,
      }}
    />
  );
};

const EditModeContent = ({register, errors, description, website}) => {
  return (
    <CardGrid oneColumn>
      <Textarea
        label="Opis"
        labelPlacement="outside"
        placeholder="Opis zawodów"
        defaultValue={description}
        {...register('description')}
      />
      <Input
        label="Adres internetowy"
        labelPlacement="outside"
        placeholder="Adres do strony zawodów"
        defaultValue={website}
        {...register('website')}
      />
    </CardGrid>
  );
};

export default DetailsCard;
