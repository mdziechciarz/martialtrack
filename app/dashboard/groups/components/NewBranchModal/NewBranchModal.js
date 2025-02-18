import {useState} from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

export default function NewBranchModal({isOpen, onOpenChange, handleCreateClubBranch}) {
  const [branchName, setBranchName] = useState('');

  const handleCreateBranch = async onClose => {
    await handleCreateClubBranch(branchName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj nową sekcję</ModalHeader>
            <ModalBody>
              <Input
                label="Nazwa sekcji"
                placeholder="Wpisz nazwę sekcji"
                value={branchName}
                onChange={({target}) => setBranchName(target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={() => handleCreateBranch(onClose)}
                isDisabled={!branchName}
              >
                Utwórz
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
