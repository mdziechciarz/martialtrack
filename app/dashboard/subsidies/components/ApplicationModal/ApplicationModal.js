import {useForm} from 'react-hook-form';

import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import FileUploadComponent from './components/FileUpload/FileUpload';

import styles from './ApplicationModal.module.css';

export default function ApplicationModal({
  isOpen,
  onOpenChange,
  subsidyInfo: {
    // id,
    title,
    description,
    deadline,
    operator,
    participantsAge,
    ownContribution,
    amount,
  } = {},
}) {
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleCancel}
      placement="center"
      size="4xl"
    >
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className={`${styles.modalTitle} flex flex-col gap-1`}>
              Złóż wniosek - {title}
            </ModalHeader>
            <ModalBody>
              <div className={styles.contentContainer}>
                <div className={styles.textInputs}>
                  <p className={styles.sectionTitle}>Dane uzupełniające:</p>
                  <div className={styles.textInputsContainer}>
                    <Input label="Pierwsze pole" placeholder="Pierwsze pole tekstowe" />
                    <Input label="Drugie pole" placeholder="Drugie pole tekstowe" />
                    <Input label="Trzecie pole" placeholder="Trzecie pole tekstowe" />
                    <Input label="Czwarte pole" placeholder="Czwarte pole tekstowe" />
                    <Input type="number" label="Pole liczbowe" placeholder="Pole liczbowe" />
                    <DatePicker label="Data" />
                  </div>
                </div>
                <div className={styles.requiredDocuments}>
                  <p className={styles.sectionTitle}>Wymagane dokumenty:</p>
                  <p className={styles.requiredDocumentsList}>
                    {`1. Oświadczenie o spełnieniu warunków uczestnictwa w projekcie
2. Oświadczenie o braku zaległości wobec ZUS i US
3. Oświadczenie o braku zaległości wobec ZUS i US
4. Oświadczenie o braku zaległości wobec ZUS i US`}
                  </p>
                  <div className={styles.fileInputContainer}>
                    <FileUploadComponent />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" type="submit">
                Złóż wniosek
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
