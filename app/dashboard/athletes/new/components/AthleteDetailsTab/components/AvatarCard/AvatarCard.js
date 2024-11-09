import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import Card from '@/components/Card/Card';
import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';
import Image from 'next/image';
import styles from './AvatarCard.module.css';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';
import userAvatarPlaceholder from './user avatar placeholder.svg';

const AvatarCard = ({children, className = '', name}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const [avatarSrc, setAvatarSrc] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  const handleRemoveLogo = () => {
    setAvatarSrc(null);
  };

  return (
    <Card>
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
                onClick={handleRemoveLogo}
              >
                <Delete16Filled />
              </Button>
            </Tooltip>
          )}
        </div>
        <Input
          label="Imię i nazwisko"
          isRequired
          isInvalid={!!errors.fullName}
          errorMessage={errors.fullName?.message}
          {...register('fullName', {
            required: {
              value: true,
              message: 'Imię i nazwisko jest wymagane',
            },
          })}
          className={styles.nameInput}
        />
      </div>
    </Card>
  );
};

export default AvatarCard;
