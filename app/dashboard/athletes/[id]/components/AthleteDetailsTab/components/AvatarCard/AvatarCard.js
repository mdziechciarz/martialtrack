import Image from 'next/image';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';

import Card from '@/components/Card/Card';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';
import userAvatarPlaceholder from './user avatar placeholder.svg';

import styles from './AvatarCard.module.css';

const AvatarCard = ({children, className = '', name, imgSrc}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log('Changes saved');
    console.log(data);
    reset();
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    reset();
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setValue('avatar', imgSrc);
    setIsEditMode(true);
  };

  return (
    <Card
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? (
        <EditModeContent
          currentName={name}
          currentImgSrc={imgSrc}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      ) : (
        <ReadOnlyContent name={name} imgSrc={imgSrc} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({name, imgSrc}) => {
  return (
    <div>
      <div className={styles.avatarWrapper}>
        <Image className={styles.avatar} src={imgSrc} alt="Avatar" width={300} height={300} />
      </div>
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

const EditModeContent = ({currentName, currentImgSrc, register, errors, setValue}) => {
  const [avatarSrc, setAvatarSrc] = useState(currentImgSrc || null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const handleRemoveAvatar = () => {
    setValue('avatar', null);
    setAvatarSrc(null);
  };

  const handleSelectAvatar = avatar => {
    setValue('avatar', avatar);
    setAvatarSrc(avatar);
  };

  return (
    <div className={styles.editModeContentContainer}>
      <NewAvatarModal
        isOpen={isModalOpen}
        onOpenChange={onModalOpenChange}
        setAvatarSrc={handleSelectAvatar}
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
              onPress={handleRemoveAvatar}
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
        defaultValue={currentName}
        {...register('fullName', {
          required: {
            value: true,
            message: 'Imię i nazwisko jest wymagane',
          },
        })}
        validationBehavior="aria"
        className={styles.nameInput}
      />
    </div>
  );
};

export default AvatarCard;
