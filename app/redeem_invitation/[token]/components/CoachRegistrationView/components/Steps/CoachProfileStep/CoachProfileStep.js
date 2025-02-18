import {useContext} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {RegistrationDataContext} from '../../../context';

import {Button} from '@nextui-org/react';

import CoachDetailsTab from './CoachDetailsTab/CoachDetailsTab';

import styles from './CoachProfileStep.module.css';

export default function CoachProfileStep({
  currentStep = 0,
  handleNextStep = () => {},
  handlePreviousStep = () => {},
}) {
  const {registrationData, setRegistrationData} = useContext(RegistrationDataContext);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm({defaultValues: registrationData.ownerData});

  const methods = useForm();
  const {handleSubmit} = methods;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm({defaultValues: registrationData.ownerData});

  const onSubmit = data => {
    setRegistrationData(prevState => ({
      ...prevState,
      ownerData: data,
    }));
    handleNextStep();
  };

  console.log(registrationData);

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.contentContainer}>
          <CoachDetailsTab />
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
    </FormProvider>
  );
}
