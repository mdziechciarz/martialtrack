import {CameraEdit20Filled, Delete16Filled} from '@fluentui/react-icons';
import {Avatar, Button, Input, Tooltip, useDisclosure} from '@nextui-org/react';
import {useState} from 'react';

import Card from '@/components/Card/Card';
import NewAvatarModal from './components/NewAvatarModal/NewAvatarModal';

import styles from './AvatarNameRoleCard.module.css';

export default function AvatarNameRoleCard({name, role, avatarSrc}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveChanges = data => {
    setIsEditMode(false);
  };

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
      {isEditMode ? (
        <EditModeContent name={name} avatarSrc={avatarSrc} />
      ) : (
        <ReadModeContent name={name} role={role} avatarSrc={avatarSrc} />
      )}
    </Card>
  );
}

const ReadModeContent = ({name, role, avatarSrc}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar name="John Doe" src={avatarSrc} size="lg" style={{width: 80, height: 80}} />
      <div>
        <p>{name}</p>
        <p style={{color: '#888'}}>{role}</p>
      </div>
    </div>
  );
};

const EditModeContent = ({name, avatarSrc}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NewAvatarModal
        isOpen={isModalOpen}
        onOpenChange={onModalOpenChange}
        // setLogoSrc={handleSelectLogo}
      />
      <div className={styles.avatarWrapper}>
        <Avatar className={styles.avatar} src={avatarSrc} name={name} width={80} height={80} />
        <div className={styles.overlay} onClick={onModalOpen}>
          <CameraEdit20Filled />
        </div>
        {avatarSrc && (
          <Tooltip content="Usuń zdjęcie" delay={500}>
            <Button
              isIconOnly
              className={styles.removePhotoButton}
              size="sm"
              // onPress={handleRemoveLogo}
            >
              <Delete16Filled />
            </Button>
          </Tooltip>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
        <Input label="Imię i nazwisko" defaultValue={name} />
        {/* <p style={{color: '#888'}}>{role}</p> */}
      </div>
    </div>
  );
};
