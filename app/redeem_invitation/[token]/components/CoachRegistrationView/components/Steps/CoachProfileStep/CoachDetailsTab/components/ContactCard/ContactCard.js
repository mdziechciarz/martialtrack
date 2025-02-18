import {useFormContext} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

const ContactCard = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useFormContext();

  return (
    <Card title="Dane kontaktowe">
      <EditModeContent register={register} errors={errors} control={control} />
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
        label="Telefon"
        labelPlacement="outside"
        placeholder="Telefon"
        isInvalid={!!errors.phoneNumber}
        isRequired
        defaultValue={currentPhoneNumber}
        validationBehavior="aria"
      />
      <Input
        {...register('email', {required: true})}
        label="E-mail"
        labelPlacement="outside"
        placeholder="E-mail"
        isInvalid={!!errors.email}
        isRequired
        defaultValue={currentEmail}
        validationBehavior="aria"
      />
    </CardGrid>
  );
};

export default ContactCard;
