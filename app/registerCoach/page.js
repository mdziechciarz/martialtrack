'use client';

import {useState} from 'react';

import {RegistrationDataProvider} from './context';

import CoachProfileStep from './components/Steps/CoachProfileStep/CoachProfileStep';
import UserAccountStep from './components/Steps/UserAccountStep/UserAccountStep';

import {Steps} from 'primereact/steps';
import styles from './RegisterEmployeePage.module.css';

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
                model={[{label: 'Konto użytkownika'}, {label: 'Profil trenera'}]}
                activeIndex={step}
              />
            </div>
            <div className={styles.contentContainer}>
              {step === 0 && (
                <UserAccountStep
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                  currentStep={step}
                />
              )}
              {step === 1 && (
                <CoachProfileStep
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
