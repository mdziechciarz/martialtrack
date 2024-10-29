'use client';

import {login} from './actions';

import {Button, Input} from '@nextui-org/react';

import backgroundPhoto from './background.png';
import facebookIcon from './facebook.svg';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast, Toaster} from 'sonner';
import styles from './LoginPage.module.css';

export default function LoginPage({searchParams}) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    }
  };

  useEffect(() => {
    if (searchParams.error) {
      toast.error(searchParams.error);
      router.replace('/login');
    }
  }, [searchParams.error]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPanel}>
        <Image
          src={backgroundPhoto}
          className={styles.backgroundPhoto}
          // objectFit="cover"
          alt="Background"
        />
      </div>
      <div className={styles.contentPanel}>
        <Toaster richColors closeButton position="bottom-center" />
        <div>
          <h1 className={styles.title}>Zaloguj się</h1>
          <p className={styles.description}>Dobrze Cię widzieć spowrotem :)</p>
          <div className={styles.credentialsLoginContainer}>
            <p className={styles.label}></p>
            <Input
              label="Email"
              placeholder="Wpisz swój email"
              labelPlacement="outside"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              label="Hasło"
              placeholder="Wpisz swoje hasło"
              labelPlacement="outside"
              isClearable
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button className={styles.loginButton} color="primary" fullWidth onClick={handleLogin}>
              Zaloguj się
            </Button>
            <Button className={styles.forgotPasswordButton} variant="light">
              Zapomniałeś hasła?
            </Button>
          </div>
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
          <Button className={styles.registerButton} variant="light" fullWidth>
            Jeszcze Cię z nami nie ma?
            <br />
            Kliknij tutaj, aby zarejestrować swój klub
          </Button>
        </div>
      </div>
    </div>
  );
}
