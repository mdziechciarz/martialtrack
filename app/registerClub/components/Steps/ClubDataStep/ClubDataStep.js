import {useContext} from 'react';
import {useForm} from 'react-hook-form';

import {Button, Input} from '@nextui-org/react';

import {RegistrationDataContext} from '../../../context';

import Card, {CardGrid} from '@/components/Card/Card';
import ClubLogoCard from './components/ClubLogoCard/ClubLogoCard';

import styles from './ClubDataStep.module.css';

export default function ClubDataStep({
  currentStep = 0,
  handleNextStep = () => {},
  handlePreviousStep = () => {},
}) {
  const {registrationData, setRegistrationData} = useContext(RegistrationDataContext);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({defaultValues: registrationData.clubData});

  const onSubmit = data => {
    setRegistrationData(prevState => ({
      ...prevState,
      clubData: data,
    }));
    handleNextStep();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contentContainer}>
        <div className={styles.grid}>
          <ClubLogoCard
            register={register}
            errors={errors}
            setValue={setValue}
            currentLogoSrc={registrationData?.clubData?.logo}
          />
          <Card title="Dane kontaktowe">
            <CardGrid>
              <Input
                label="Nr telefonu"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                {...register('phoneNumber', {
                  required: {
                    value: true,
                    message: 'Numer telefonu jest wymagany',
                  },
                })}
                validationBehavior="aria"
              />
              <Input
                label="E-mail"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Nieprawidłowy format adresu e-mail',
                  },
                  required: 'Email jest wymagany',
                })}
                validationBehavior="aria"
              />
              <Input
                label="Strona internetowa"
                labelPlacement="outside"
                {...register('website')}
                validationBehavior="aria"
              />
            </CardGrid>
          </Card>
          <Card title="Adres">
            <CardGrid>
              <Input
                label="Ulica"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.street}
                errorMessage={errors.street?.message}
                {...register('street', {
                  required: {
                    value: true,
                    message: 'Ulica jest wymagana',
                  },
                })}
                validationBehavior="aria"
              />
              <Input
                label="Numer domu/mieszkania"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.houseNumber}
                errorMessage={errors.houseNumber?.message}
                {...register('houseNumber', {
                  required: {
                    value: true,
                    message: 'Numer domu/mieszkania jest wymagany',
                  },
                })}
                validationBehavior="aria"
              />
              <Input
                label="Miasto"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.city}
                errorMessage={errors.city?.message}
                {...register('city', {
                  required: {
                    value: true,
                    message: 'Miasto jest wymagane',
                  },
                })}
                validationBehavior="aria"
              />
              <Input
                label="Kod pocztowy"
                labelPlacement="outside"
                isRequired
                isInvalid={!!errors.postalCode}
                errorMessage={errors.postalCode?.message}
                {...register('postalCode', {
                  required: {
                    value: true,
                    message: 'Kod pocztowy jest wymagany',
                  },
                  pattern: {
                    value: /^\d{2}-\d{3}$/,
                    message: 'Nieprawidłowy format kodu pocztowego',
                  },
                })}
                validationBehavior="aria"
              />
            </CardGrid>
          </Card>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="ghost" isDisabled={currentStep === 0} onClick={handlePreviousStep}>
          Wróć
        </Button>
        <Button color="primary" type="submit">
          Dalej
        </Button>
      </div>
    </form>
  );
}
