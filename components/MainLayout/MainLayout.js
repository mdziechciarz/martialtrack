'use client';

import {
  Calendar12Filled,
  ClipboardTaskListLtr20Filled,
  Dismiss16Filled,
  Home16Filled,
  Navigation16Filled,
  People12Filled,
  Person16Filled,
  Send16Filled,
  Settings16Filled,
  ShieldPerson20Filled,
  Wallet16Filled,
} from '@fluentui/react-icons';
import {useState} from 'react';

import styles from './MainLayout.module.css';

const MainLayout = ({children}) => {
  // const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Functino for opening sidebar to pass down to HamburgerButton
  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className={styles.layoutContainer}>
      <SideBar isOpen={isSideBarOpen} closeSideBar={closeSideBar} openSideBar={openSideBar} />
      <div className={styles.mainContainer}>
        <TopBar openSideBar={openSideBar} isSideBarOpen={isSideBarOpen} />
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

const TopBar = ({openSideBar, isSideBarOpen}) => {
  return (
    <div className={styles.topBarContainer}>
      {!isSideBarOpen && <HamburgerButton openSideBar={openSideBar} />}
    </div>
  );
};

const HamburgerButton = ({openSideBar}) => {
  return (
    <button className={styles.hamburgerButton} onClick={openSideBar}>
      <Navigation16Filled />
    </button>
  );
};

const SideBar = ({isOpen, closeSideBar, openSideBar}) => {
  return (
    <div
      className={`${styles.sideBarContainer} ${isOpen ? styles.sideBarOpen : styles.sideBarClosed}`}
    >
      {isOpen ? (
        <SideBarCloseButton closeSideBar={closeSideBar} />
      ) : (
        <HamburgerButton openSideBar={openSideBar} />
      )}
      <h1 className={styles.MartialTrackLogo}>MartialTrack</h1>
      <ul className={styles.sideBarButtonsList}>
        <SideBarButton icon={Home16Filled} text="Panel Główny" active />
        <SideBarButton icon={Person16Filled} text="Zawodnicy" />
        <SideBarButton icon={ClipboardTaskListLtr20Filled} text="Listy obecności" />
        <SideBarButton icon={People12Filled} text="Grupy" />
        <SideBarButton icon={Wallet16Filled} text="Płatności" />
        <SideBarButton icon={Send16Filled} text="Wiadomości" />
        <SideBarButton icon={ShieldPerson20Filled} text="Trenerzy" />
        <SideBarButton icon={Calendar12Filled} text="Harmonogram zajęć" />
        <SideBarButton icon={Settings16Filled} text="Ustawienia" />
      </ul>
    </div>
  );
};

const SideBarCloseButton = ({closeSideBar}) => {
  return (
    <button className={styles.sideBarCloseButton} onClick={closeSideBar}>
      <Dismiss16Filled />
    </button>
  );
};

const SideBarButton = ({icon: Icon, text, active}) => {
  return (
    <li className={`${styles.sideBarButton} ${active ? styles.sideBarButtonActive : ''}`}>
      <button>
        <Icon className={styles.sideBarButtonIcon} />
        <span>{text}</span>
      </button>
    </li>
  );
};
