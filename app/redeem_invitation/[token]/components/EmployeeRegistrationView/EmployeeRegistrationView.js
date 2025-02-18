'use client';

import {useState} from 'react';

import {RegistrationDataProvider} from './context';

import UserAccountStep from './components/Steps/UserAccountStep/UserAccountStep';

import styles from './EmployeeRegistrationView.module.css';

// TODO
// - Don't use card component

const EmployeeRegistrationView = ({email, token}) => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 3) {
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    if (step === 0) {
      return;
    }
    setStep(prev => prev - 1);
  };

  return (
    <RegistrationDataProvider>
      <div className={styles.pageContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.contentContainer}>
              {step === 0 && (
                <UserAccountStep
                  handlePreviousStep={handlePreviousStep}
                  currentStep={step}
                  email={email}
                  token={token}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </RegistrationDataProvider>
  );
};

export default EmployeeRegistrationView;
