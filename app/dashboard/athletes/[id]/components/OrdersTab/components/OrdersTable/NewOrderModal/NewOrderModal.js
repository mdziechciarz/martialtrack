import {useForm} from 'react-hook-form';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';

import {ReceiptAdd20Filled} from '@fluentui/react-icons';
import {useState} from 'react';

export default function NewOrderModal({isOpen, onOpenChange, handleCreateNewOrder}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      if (!data) {
        throw new Error('Data is required');
      }

      const {price, order} = data;

      if (!price || !order) {
        throw new Error('Price and order are required');
      }

      // Call the function to create a new order
      await handleCreateNewOrder({price, order});
    } catch (error) {
      console.error('Error creating new order:', error);
    }
    setIsLoading(false);
    reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleCancel} placement="center">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Dodaj nowe zamówienie</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  {...register('price', {required: 'Pole należność jest wymagane'})}
                  validationBehavior="aria"
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                  type="number"
                  label="Należność"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">PLN</span>
                    </div>
                  }
                />
                <Textarea
                  isRequired
                  {...register('order', {required: 'Pole zamaówienie jest wymagane'})}
                  validationBehavior="aria"
                  isInvalid={!!errors.order}
                  errorMessage={errors.order?.message}
                  label="Zamówienie"
                  placeholder="Zamówione produkty"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                type="submit"
                endContent={<ReceiptAdd20Filled />}
                isDisabled={isLoading}
                isLoading={isLoading}
              >
                Dodaj
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
