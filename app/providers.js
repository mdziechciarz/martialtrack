'use client';

import {PrimeReactProvider} from 'primereact/api';

import {NextUIProvider} from '@nextui-org/react';

import 'primereact/resources/themes/lara-light-cyan/theme.css';

export function Providers({children}) {
  return (
    <NextUIProvider>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </NextUIProvider>
  );
}
