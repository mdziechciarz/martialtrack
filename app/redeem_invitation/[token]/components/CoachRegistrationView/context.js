import {createContext, useState} from 'react';

export const RegistrationDataContext = createContext({
  registrationData: {
    clubData: null,
    ownerData: null,
  },
  setRegistrationData: () => {},
});

export const RegistrationDataProvider = ({children}) => {
  const [registrationData, setRegistrationData] = useState({
    clubData: null,
    userAccountData: null,
  });

  return (
    <RegistrationDataContext.Provider value={{registrationData, setRegistrationData}}>
      {children}
    </RegistrationDataContext.Provider>
  );
};
