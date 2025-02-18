import Card from '@/components/Card/Card';
import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';
import Image from 'next/image';
import {useState} from 'react';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';

import styles from './AvatarCard.module.css';

// const AvatarCard = ({children, className = '', name, imgSrc}) => {
//   return (
//     <div className={`${styles.container} ${className}`}>
//       <div className={styles.avatarWrapper}>
//         <Image className={styles.avatar} src={imgSrc} alt="Avatar" width={300} height={300} />
//       </div>
//       <h2 className={styles.name}>{name}</h2>
//     </div>
//   );
// };

const AvatarCard = ({children, className = '', name, imgSrc}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card isEditable isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      {isEditMode ? (
        <EditModeContent name={name} imgSrc={imgSrc} />
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

const EditModeContent = ({name, imgSrc}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  return (
    <div className={styles.editModeContentContainer}>
      <NewAvatarModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
      <div className={styles.avatarWrapper}>
        <Image className={styles.avatar} src={imgSrc} alt="Avatar" width={300} height={300} />
        <div className={styles.overlay} onClick={onModalOpen}>
          <CameraEdit20Filled />
        </div>
        <Tooltip content="Usuń zdjęcie" delay={500}>
          <Button isIconOnly className={styles.removePhotoButton} size="sm">
            <Delete16Filled />
          </Button>
        </Tooltip>
      </div>
      <Input placeholder="Imię i nazwisko" defaultValue={name} className={styles.nameInput} />
    </div>
  );
};

export default AvatarCard;
