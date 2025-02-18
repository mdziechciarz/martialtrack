import {useState} from 'react';

import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Tooltip, useDisclosure} from '@nextui-org/react';
import Image from 'next/image';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';
import userAvatarPlaceholder from './user avatar placeholder.svg';

import styles from './UserAvatarCard.module.css';

const UserAvatarCard = ({children, className = ''}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const [avatarSrc, setAvatarSrc] = useState(null);

  const handleRemoveAvatar = () => {
    setLogoSrc(null);
  };

  return (
    <div className={styles.editModeContentContainer}>
      <NewAvatarModal
        isOpen={isModalOpen}
        onOpenChange={onModalOpenChange}
        setAvatarSrc={setAvatarSrc}
      />
      <div className={styles.avatarWrapper}>
        <Image
          className={styles.avatar}
          src={avatarSrc || userAvatarPlaceholder}
          alt="Avatar"
          width={300}
          height={300}
        />
        <div className={styles.overlay} onClick={onModalOpen}>
          <CameraEdit20Filled />
        </div>
        {avatarSrc && (
          <Tooltip content="Usuń zdjęcie" delay={500}>
            <Button
              isIconOnly
              className={styles.removePhotoButton}
              size="sm"
              onClick={handleRemoveAvatar}
            >
              <Delete16Filled />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default UserAvatarCard;
