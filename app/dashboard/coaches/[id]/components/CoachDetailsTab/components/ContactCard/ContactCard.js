import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import {updateCoachContactDetails} from '../../../../actions/updateCoach';

import styles from './ContactCard.module.css';

const ContactCard = ({refetchCoachData, coachId, phoneNumber, email}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    try {
      setIsSaving(true);

      const {success} = await updateCoachContactDetails({
        id: coachId,
        phoneNumber: data.phoneNumber,
        email: data.email,
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
      className={styles.contactCard}
      title="Dane kontaktowe"
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
          errors={errors}
          control={control}
          currentPhoneNumber={phoneNumber}
          currentEmail={email}
        />
      ) : (
        <ReadOnlyContent phoneNumber={phoneNumber} email={email} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({phoneNumber, email}) => {
  return (
    <CardEntries
      entries={{
        Telefon: phoneNumber,
        'E-mail': email,
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
