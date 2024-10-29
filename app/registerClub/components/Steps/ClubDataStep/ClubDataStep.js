import {useContext} from 'react';
import {useForm} from 'react-hook-form';

import {Button, Input} from '@nextui-org/react';

import {RegistrationDataContext} from '../../../context';

import Card, {CardEntries} from '@/components/Card/Card';
import ClubLogoCard from './components/ClubLogoCard/ClubLogoCard';

import exampleLogo from './logo.png';

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
          <ClubLogoCard imgSrc={exampleLogo} register={register} errors={errors} />
          <Card title="Dane kontaktowe">
            <CardEntries
              nonTextValues
              entries={{
                'Nr telefonu': (
                  <Input
                    label="Nr telefonu"
                    isRequired
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                    {...register('phoneNumber', {
                      required: {
                        value: true,
                        message: 'Numer telefonu jest wymagany',
                      },
                    })}
                  />
                ),
                'E-mail': (
                  <Input
                    label="E-mail"
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
                  />
                ),
                'Strona internetowa': <Input label="Strona internetowa" {...register('website')} />,
              }}
            />
          </Card>
          <Card title="Adres">
            <CardEntries
              nonTextValues
              entries={{
                Ulica: (
                  <Input
                    label="Ulica"
                    isRequired
                    isInvalid={!!errors.street}
                    errorMessage={errors.street?.message}
                    {...register('street', {
                      required: {
                        value: true,
                        message: 'Ulica jest wymagana',
                      },
                    })}
                  />
                ),
                'Numer domu/mieszkania': (
                  <Input
                    label="Numer domu/mieszkania"
                    isRequired
                    isInvalid={!!errors.houseNumber}
                    errorMessage={errors.houseNumber?.message}
                    {...register('houseNumber', {
                      required: {
                        value: true,
                        message: 'Numer domu/mieszkania jest wymagany',
                      },
                    })}
                  />
                ),
                Miasto: (
                  <Input
                    label="Miasto"
                    isRequired
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                    {...register('city', {
                      required: {
                        value: true,
                        message: 'Miasto jest wymagane',
                      },
                    })}
                  />
                ),
                'Kod pocztowy': (
                  <Input
                    label="Kod pocztowy"
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
                  />
                ),
              }}
            />
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
