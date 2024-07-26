'use client';

import Image from 'next/image';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';

import {CameraEdit20Filled} from '@fluentui/react-icons';
import {useDisclosure} from '@nextui-org/react';
import styles from './Header.module.css';
import NewBackgroundPhotoModal from './components/NewBackgroundPhotoModal/NewBackgroundPhotoModal';

// Editable
const Header = ({bannerSrc, clubLogosrc}) => {
  const {
    isOpen: isAvatarModalOpen,
    onOpen: onAvatarModalOpen,
    onOpenChange: onAvatarModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isBackgroundModalOpen,
    onOpen: onBackgroundModalOpen,
    onOpenChange: onBackgroundModalOpenChange,
  } = useDisclosure();

  return (
    <header className={styles.header}>
      <NewAvatarModal isOpen={isAvatarModalOpen} onOpenChange={onAvatarModalOpenChange} />
      <NewBackgroundPhotoModal
        isOpen={isBackgroundModalOpen}
        onOpenChange={onBackgroundModalOpenChange}
      />
      <div className={styles.bannerWrapper}>
        <Image
          className={styles.banner}
          src={bannerSrc}
          alt="Background Photo"
          width={1640}
          height={214}
        />
        <div className={styles.bannerOverlay} onClick={onBackgroundModalOpen}>
          <CameraEdit20Filled />
        </div>
      </div>
      <div className={styles.avatarWrapper}>
        <Image
          className={styles.avatar}
          src={clubLogosrc}
          alt="Club Logo"
          width={300}
          height={300}
        />
        <div className={styles.overlay} onClick={onAvatarModalOpen}>
          <CameraEdit20Filled />
        </div>
      </div>
    </header>
  );
};

// const Header = ({bannerSrc, clubLogosrc}) => {
//   return (
//     <header className={styles.header}>
//       <Image className={styles.banner} src={bannerSrc} alt="Logo" width={1640} height={214} />
//       <Image
//         className={styles.clubLogo}
//         src={clubLogosrc}
//         alt="Club Logo"
//         width={150}
//         height={150}
//       />
//     </header>
//   );
// };

export default Header;
