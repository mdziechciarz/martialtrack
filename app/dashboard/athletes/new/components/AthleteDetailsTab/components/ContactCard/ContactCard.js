import {useFormContext} from 'react-hook-form';

import Card, {CardGrid} from '@/components/Card/Card';

import {Input} from '@nextui-org/react';
import styles from './ContactCard.module.css';

const ContactCard = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  return (
    <Card className={styles.contactCard} title="Dane kontaktowe">
      <CardGrid>
        <Input
          label="Nr telefonu"
          labelPlacement="outside"
          placeholder="+48 123 456 789"
          {...register('phoneNumber', {
            // required: {
            //   value: true,
            //   message: 'Numer telefonu jest wymagany',
            // },
          })}
          isInvalid={!!errors.phoneNumber}
        />
        <Input
          label="E-mail"
          labelPlacement="outside"
          placeholder="imie.nazwisko@email.com"
          {...register('email', {
            // required: {
            //   value: true,
            //   message: 'Adres e-mail jest wymagany',
            // },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Nieprawidłowy format adresu e-mail',
            },
          })}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </CardGrid>
    </Card>
  );
};

export default ContactCard;
