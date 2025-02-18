import {useContext} from 'react';

import {RegistrationDataContext} from '../../../context';

import {Button} from '@nextui-org/react';

import {signUpNewClub} from '@/app/registerClub/actions';
import styles from './StripeStep.module.css';

export default function StripeStep({
  step = 0,
  handleNextStep = () => {},
  handlePreviousStep = () => {},
}) {
  const {registrationData, setRegistrationData} = useContext(RegistrationDataContext);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm({defaultValues: registrationData.stripeData});

  // const onSubmit = data => {
  //   setRegistrationData(prevState => ({
  //     ...prevState,
  //     stripeData: data,
  //   }));
  //   handleNextStep();
  // };

  const handleRegister = () => {
    console.log('Registering');

    console.log(registrationData);

    signUpNewClub({clubData: registrationData.clubData, ownerData: registrationData.ownerData});
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Button color="primary" onPress={handleRegister}>
          Utwórz konto
        </Button>
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="ghost" isDisabled={step === 3} onClick={handlePreviousStep}>
          Wróć
        </Button>
        <Button color="primary" onClick={handleNextStep}>
          Dalej
        </Button>
      </div>
    </div>
  );
}
