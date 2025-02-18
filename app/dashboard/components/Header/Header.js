'use client';

import {useDisclosure} from '@nextui-org/react';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import {CameraEdit20Filled} from '@fluentui/react-icons';

import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';
import NewBackgroundPhotoModal from './components/NewBackgroundPhotoModal/NewBackgroundPhotoModal';

import clubLogoPlaceholder from './club_logo_placeholder.svg';

import {fetchClubLogoAndCoverPhoto, updateClubCoverPhoto, updateClubLogo} from '../../actions';
import styles from './Header.module.css';

// Editable
const Header = ({}) => {
  const [bannerSrc, setBannerSrc] = useState(null);
  const [clubLogoSrc, setClubLogoSrc] = useState(null);

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

  const getLogoAndCoverPhoto = async () => {
    const response = await fetchClubLogoAndCoverPhoto();

    console.log('fetchClubLogoAndCoverPhoto response', response);

    if (response.success) {
      setClubLogoSrc(response.logoSrc);
      setBannerSrc(response.coverPhotoSrc);
    }
  };

  const handleUpdateLogo = async photo => {
    const response = await updateClubLogo({logo: photo});

    console.log('updateLogo response', response);

    if (response.success) {
      getLogoAndCoverPhoto();
    }
  };

  const handleUpdateCoverPhoto = async photo => {
    const response = await updateClubCoverPhoto({coverPhoto: photo});

    console.log('updateCoverPhoto response', response);

    if (response.success) {
      getLogoAndCoverPhoto();
    }
  };

  useEffect(() => {
    getLogoAndCoverPhoto();
  }, []);

  return (
    <header className={styles.header}>
      <NewAvatarModal
        isOpen={isAvatarModalOpen}
        onOpenChange={onAvatarModalOpenChange}
        handleUpdateLogo={handleUpdateLogo}
      />
      <NewBackgroundPhotoModal
        isOpen={isBackgroundModalOpen}
        onOpenChange={onBackgroundModalOpenChange}
        handleUpdateCoverPhoto={handleUpdateCoverPhoto}
      />
      <div className={styles.bannerWrapper}>
        <Image
          className={styles.banner}
          src={bannerSrc || clubLogoPlaceholder}
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
          src={clubLogoSrc || clubLogoPlaceholder}
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
