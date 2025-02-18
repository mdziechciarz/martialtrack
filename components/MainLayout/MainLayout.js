'use client';

import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';

import {
  Cart16Filled,
  ChevronDown16Filled,
  ClipboardTaskListLtr20Filled,
  Dismiss16Filled,
  Home16Filled,
  Navigation16Filled,
  People12Filled,
  Person16Filled,
  ReceiptMoney16Filled,
  Send16Filled,
  Settings16Filled,
  ShieldPerson20Filled,
  Wallet16Filled,
} from '../icons.js';

// import {ReactComponent as MartialTrackLogo} from './logo_white.svg';

import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import {usePathname, useRouter} from 'next/navigation';
import {logOut} from './actions.ts';

import {Trophy16Filled} from '@fluentui/react-icons';

import {createClient} from '@/utils/supabase/client';
import styles from './MainLayout.module.css';

// const MainLayout = ({children, user}) => {
const MainLayout = ({children}) => {
  const supabase = createClient();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Function for opening sidebar to pass down to HamburgerButton
  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const fetchUser = useCallback(async () => {
    console.log('fetchUser');

    setIsLoading(true);

    const {
      data: {user},
    } = await supabase.auth.getUser();

    const {data: userData, error: userError} = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userData.avatar_src) {
      const {data: userAvatarData, error: userAvatarError} = await supabase.storage
        .from('user_avatars')
        .createSignedUrl(user.id, 60 * 60 * 24 * 30);

      userData.avatar_src = userAvatarData.signedUrl;
    }

    const {data: clubData, error: clubError} = await supabase
      .from('clubs')
      .select('*')
      .eq('id', userData.club_id)
      .single();

    if (clubData.logo_src) {
      const {data: clubLogoData, error: clubLogoError} = await supabase.storage
        .from('club_logos')
        .createSignedUrl(clubData.id, 60 * 60 * 24 * 30);

      clubData.logo_src = clubLogoData.signedUrl;
    }

    setUser(userData);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={styles.layoutContainer}>
      <SideBar isOpen={isSideBarOpen} closeSideBar={closeSideBar} openSideBar={openSideBar} />
      <div className={styles.mainContainer}>
        <TopBar
          openSideBar={openSideBar}
          isSideBarOpen={isSideBarOpen}
          avatarSrc={user?.avatar_src}
          key={user?.avatar_src}
        />
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

const TopBar = ({openSideBar, isSideBarOpen, avatarSrc}) => {
  const handleLogout = async () => {
    logOut();
  };

  return (
    <div className={styles.topBarContainer}>
      {!isSideBarOpen && <HamburgerButton openSideBar={openSideBar} />}
      <UserProfileButton handleLogout={handleLogout} avatarSrc={avatarSrc} />
    </div>
  );
};

const UserProfileButton = ({handleLogout, avatarSrc}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className={styles.userProfileButton}>
          <div className={styles.userProfileButtonContainer}>
            <Avatar size="sm" src={avatarSrc || null} />
            <ChevronDown16Filled />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={handleLogout}>Wyloguj</DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
      {/* <h1 className={styles.MartialTrackLogo}>MartialTrack</h1> */}
      <div className={styles.MartialTrackLogo}>
        <Image src="/logo_white.svg" alt="MartialTrack Logo" width={180} height={37} />
      </div>
      <ul className={styles.sideBarButtonsList}>
        <SideBarButton icon={Home16Filled} text="Panel Główny" url="/dashboard" />
        <SideBarButton icon={Person16Filled} text="Zawodnicy" url="/dashboard/athletes" />
        <SideBarButton
          icon={ClipboardTaskListLtr20Filled}
          text="Listy obecności"
          url="/dashboard/attendance"
        />
        <SideBarButton icon={People12Filled} text="Grupy" url="/dashboard/groups" />
        <SideBarButton icon={Wallet16Filled} text="Płatności" url="/dashboard/payments" />
        <SideBarButton icon={Send16Filled} text="Wiadomości" url="/dashboard/messages" />
        <SideBarButton icon={ShieldPerson20Filled} text="Trenerzy" url="/dashboard/coaches" />
        <SideBarButton icon={Trophy16Filled} text="Zawody" url="/dashboard/competitions" />
        {/* <SideBarButton icon={Calendar12Filled} text="Harmonogram zajęć" url="/dashboard/schedule" /> */}
        <SideBarButton
          icon={Cart16Filled}
          text="Zamówienia"
          url="/dashboard/orders"
          hasBadge
          badgeContent={5}
        />
        <SideBarButton icon={ReceiptMoney16Filled} text="Dotacje" url="/dashboard/subsidies" />
        <SideBarButton icon={Settings16Filled} text="Ustawienia" url="/dashboard/settings" />
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

const SideBarButton = ({icon: Icon, text, url, badgeContent, hasBadge}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === url;

  const handleClick = () => {
    router.push(url);
  };

  return (
    <li className={`${styles.sideBarButton} ${isActive ? styles.sideBarButtonActive : ''}`}>
      {hasBadge ? (
        <Button
          onClick={handleClick}
          fullWidth
          startContent={
            <Badge
              size="sm"
              color="danger"
              content={badgeContent}
              placement="top-right"
              showOutline={false}
            >
              <Icon />
            </Badge>
          }
        >
          {text}
        </Button>
      ) : (
        <Button onClick={handleClick} fullWidth startContent={<Icon />}>
          {text}
        </Button>
      )}
    </li>
  );
};
