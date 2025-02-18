import {createContext, useState} from 'react';

export const RegistrationDataContext = createContext({
  registrationData: {
    userData: null,
  },
  setRegistrationData: () => {},
});

export const RegistrationDataProvider = ({children}) => {
  const [registrationData, setRegistrationData] = useState({
    userData: null,
  });

  return (
    <RegistrationDataContext.Provider value={{registrationData, setRegistrationData}}>
      {children}
    </RegistrationDataContext.Provider>
  );
};
