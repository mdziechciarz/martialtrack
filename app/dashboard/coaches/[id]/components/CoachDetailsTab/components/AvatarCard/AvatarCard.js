import {encode} from 'base64-arraybuffer';
import Image from 'next/image';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';

import Card from '@/components/Card/Card';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';
import userAvatarPlaceholder from './user avatar placeholder.svg';

import {updateCoachNameAndAvatar} from '../../../../actions/updateCoach';

import styles from './AvatarCard.module.css';

// Utility function to convert image URL to base64 using base64-arraybuffer
const convertImageToBase64 = async imageUrl => {
  if (!imageUrl || imageUrl.startsWith('data:')) return imageUrl;

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = encode(arrayBuffer);
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

const AvatarCard = ({className = '', name, imgSrc = null, coachId, refetchCoachData}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imgSrcBase64, setImgSrcBase64] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    console.log('Saving changes:', data);

    try {
      setIsSaving(true);

      const {success} = await updateCoachNameAndAvatar({
        id: coachId,
        fullName: data.fullName,
        avatarBase64: data.avatar,
      });

      if (success) {
        console.log('Changes saved successfully');
        refetchCoachData();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
      reset();
      setIsEditMode(false);
    }
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    reset();
    setIsEditMode(false);
  };

  const handleEdit = async () => {
    console.log('Editing');
    const base64Image = await convertImageToBase64(imgSrc);
    setImgSrcBase64(base64Image);
    setValue('avatar', base64Image);
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
      isSaving={isSaving}
    >
      {isEditMode ? (
        <EditModeContent
          currentName={name}
          currentImgSrc={imgSrcBase64}
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
        <Image
          className={styles.avatar}
          src={imgSrc || userAvatarPlaceholder}
          alt="Avatar"
          width={300}
          height={300}
        />
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
