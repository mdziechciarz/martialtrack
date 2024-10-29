'use client';

import {useState} from 'react';

import {RegistrationDataProvider} from './context';

import {Steps} from 'primereact/steps';

import ClubDataStep from './components/Steps/ClubDataStep/ClubDataStep';
import OwnerAccountStep from './components/Steps/OwnerAccountStep/OwnerAccountStep';
import StripeStep from './components/Steps/StripeStep/StripeStep';

import styles from './RegisterClubPage.module.css';

// TODO
// - Don't use card component

const RegisterClubPage = () => {
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
            <div className={styles.stepperContainer}>
              <Steps
                model={[
                  {label: 'Dane klubu'},
                  {label: 'Konto właściciela'},
                  {label: 'Składki członkowskie'},
                  {label: 'Subskrypcja'},
                ]}
                activeIndex={step}
              />
            </div>
            <div className={styles.contentContainer}>
              {step === 0 && (
                <ClubDataStep
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                  currentStep={step}
                />
              )}
              {step === 1 && (
                <OwnerAccountStep
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                  currentStep={step}
                />
              )}
              {step === 2 && (
                <StripeStep
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                  currentStep={step}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </RegistrationDataProvider>
  );
};

//   return (
//     <RegistrationDataProvider>
//       <div className={styles.container}>
//         <div className={styles.cardContainer}>
//           <div className={styles.card}>
//             <div className={styles.stepperContainer}>
//               <Steps
//                 model={[
//                   {label: 'Dane klubu'},
//                   {label: 'Konto właściciela'},
//                   {label: 'Składki członkowskie'},
//                   {label: 'Subskrypcja'},
//                 ]}
//                 activeIndex={step}
//               />
//             </div>
//             <div className={styles.contentContainer}>
//               {step === 0 && (
//                 <ClubDataStep
//                   handleNextStep={handleNextStep}
//                   handlePreviousStep={handlePreviousStep}
//                   currentStep={step}
//                 />
//               )}
//               {step === 1 && <OwnerAccountStep />}
//               {step === 2 && <StripeStep />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </RegistrationDataProvider>
//   );
// };

export default RegisterClubPage;
