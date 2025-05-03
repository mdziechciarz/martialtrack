import {useEffect, useState} from 'react';
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

export default function EditOrderModal({
  isOpen,
  onOpenChange,
  editedOrder = {},
  onClose,
  handleEditOrder,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  // Update form values when editedOrder changes
  useEffect(() => {
    if (editedOrder) {
      reset({
        price: editedOrder.price,
        order: editedOrder.order,
      });
    }
  }, [editedOrder, reset]);

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

      // Call the function to edit the order
      await handleEditOrder({
        ...data,
        orderId: editedOrder.orderId,
      });
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setIsLoading(false);
      reset();
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (onClose) onClose(); // Call onClose if provided
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={value => {
        if (!value && onClose) onClose(); // Call onClose when modal is closing
        onOpenChange(value);
      }}
      placement="center"
    >
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Edytuj zamówienie</ModalHeader>
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
              <Button
                variant="light"
                onPress={() => {
                  handleCancel();
                  onClose();
                }}
              >
                Anuluj
              </Button>
              <Button
                color="primary"
                type="submit"
                endContent={<ReceiptAdd20Filled />}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Zapisz
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
