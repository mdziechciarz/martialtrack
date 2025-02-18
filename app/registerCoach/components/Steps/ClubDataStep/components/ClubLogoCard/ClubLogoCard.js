import {useState} from 'react';

import Card from '@/components/Card/Card';
import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';
import Image from 'next/image';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';

import clubLogoPlaceholder from './club logo placeholder.svg';

import styles from './ClubLogoCard.module.css';

const ClubLogoCard = ({register, errors}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const [logoSrc, setLogoSrc] = useState(null);

  const handleRemoveLogo = () => {
    setLogoSrc(null);
  };

  return (
    <Card title="Nazwa i logo">
      <div className={styles.editModeContentContainer}>
        <NewAvatarModal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          setLogoSrc={setLogoSrc}
        />
        <div className={styles.avatarWrapper}>
          <Image
            className={styles.avatar}
            src={logoSrc || clubLogoPlaceholder}
            alt="Avatar"
            width={300}
            height={300}
          />
          <div className={styles.overlay} onClick={onModalOpen}>
            <CameraEdit20Filled />
          </div>
          {logoSrc && (
            <Tooltip content="Usuń zdjęcie" delay={500}>
              <Button
                isIconOnly
                className={styles.removePhotoButton}
                size="sm"
                onClick={handleRemoveLogo}
              >
                <Delete16Filled />
              </Button>
            </Tooltip>
          )}
        </div>
        <Input
          label="Nazwa klubu"
          className={styles.nameInput}
          isRequired
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register('name', {
            required: {
              value: true,
              message: 'Nazwa klubu jest wymagana',
            },
          })}
        />
      </div>
    </Card>
  );
};

export default ClubLogoCard;
