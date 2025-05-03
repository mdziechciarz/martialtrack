import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import styles from './ContactCard.module.css';

const exampleContactData = {
  phoneNumber: '123456789',
  email: 'karolina.kowalska@email.com',
};

const ContactCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
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
      className={styles.contactCard}
      title="Dane kontaktowe"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          errors={errors}
          control={control}
          currentPhoneNumber={exampleContactData.phoneNumber}
          currentEmail={exampleContactData.email}
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
      entries={{
        Telefon: exampleContactData.phoneNumber,
        'E-mail': exampleContactData.email,
      }}
    />
  );
};

const EditModeContent = ({register, errors, control, currentPhoneNumber, currentEmail}) => {
  return (
    <CardGrid>
      <Input
        {...register('phoneNumber', {required: true})}
        validationBehavior="aria"
        label="Telefon"
        placeholder="Telefon"
        isInvalid={!!errors.phoneNumber}
        isRequired
        defaultValue={currentPhoneNumber}
      />
      <Input
        {...register('email', {required: true})}
        validationBehavior="aria"
        label="E-mail"
        placeholder="E-mail"
        isInvalid={!!errors.email}
        isRequired
        defaultValue={currentEmail}
      />
    </CardGrid>
  );
};

export default ContactCard;
