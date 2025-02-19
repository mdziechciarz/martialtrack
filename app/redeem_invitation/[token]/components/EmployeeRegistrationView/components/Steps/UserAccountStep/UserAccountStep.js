import {useContext} from 'react';
import {useForm} from 'react-hook-form';

import {registerAdminUser} from '../../../../../../actions';
import {RegistrationDataContext} from '../../../context';

import Image from 'next/image';

import {Button, Input} from '@nextui-org/react';

import UserAvatarCard from './components/UserAvatarCard/UserAvatarCard';

import facebookIcon from './facebook.svg';

import styles from './UserAccountStep.module.css';

export default function UserAccountStep({
  currentStep = 0,
  // handleNextStep = () => {},
  handlePreviousStep = () => {},
  email,
  token,
}) {
  const {registrationData, setRegistrationData} = useContext(RegistrationDataContext);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {...registrationData.userData, email}});

  const onSubmit = data => {
    console.log('data', data);

    setRegistrationData(prevState => ({
      ...prevState,
      userData: data,
    }));

    registerAdminUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      token,
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <UserAvatarCard />
          <Input
            label="Imię i nazwisko"
            placeholder="Wpisz swoje imię i nazwisko"
            labelPlacement="outside"
            isRequired
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
            {...register('fullName', {
              required: {
                value: true,
                message: 'Imię i nazwisko są wymagane',
              },
            })}
            validationBehavior="aria"
          />
          <Input
            label="Email"
            placeholder="Wpisz swój email"
            labelPlacement="outside"
            // isRequired
            // isInvalid={!!errors.email}
            // errorMessage={errors.email?.message}
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Nieprawidłowy format adresu e-mail',
              },
              required: 'Email jest wymagany',
            })}
            // value={email}
            // defaultValue={email}
            isDisabled
            validationBehavior="aria"
          />
          <Input
            label="Hasło"
            placeholder="Wpisz swoje hasło"
            labelPlacement="outside"
            isClearable
            type="password"
            isRequired
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: {
                value: true,
                message: 'Hasło jest wymagane',
              },
              minLength: {
                value: 8,
                message: 'Hasło za krótkie. Wymagana długość to 6 do 20 znaków',
              },
            })}
            validationBehavior="aria"
          />
          <div className={styles.separator}>
            <div className={styles.line}></div>
            <span>Lub:</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.oauthLoginContainer}>
            <Button
              variant="ghost"
              fullWidth
              startContent={<Image src={facebookIcon} width={24} height={24} alt="Facebook Icon" />}
            >
              Użyj konta Facebook
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="ghost" isDisabled={currentStep === 0} onPress={handlePreviousStep}>
          Wróć
        </Button>
        <Button color="primary" type="submit">
          Zarejestruj
        </Button>
      </div>
    </form>
  );
}
