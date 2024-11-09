import {useForm} from 'react-hook-form';

import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';

export default function MoreInfoModal({isOpen, onOpenChange, handleOpenApplicationModal}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log('Submitted');
    console.log(data);
  };

  const handleCancel = () => {
    console.log('closing modal');
    reset();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleCancel} placement="center">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Dodatkowe informacje</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                type="submit"
                onPress={() => {
                  onClose();
                  handleOpenApplicationModal();
                }}
              >
                Złóż wniosek
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
