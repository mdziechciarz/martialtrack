import {Controller, useForm} from 'react-hook-form';

import {PersonAdd16Filled} from '@fluentui/react-icons';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';

export default function InviteUserModal({isOpen, onOpenChange}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    reset,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Handle form submission logic here
  };

  const handleOpenChange = open => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Zaproś nowego uzytkownika</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  label="Imię i nazwisko"
                  {...register('fullName', {required: true})}
                  isInvalid={!!errors.fullName}
                  isRequired
                  validationBehavior="aria"
                />
                <Input
                  label="Adres e-mail"
                  {...register('email', {required: true})}
                  isInvalid={!!errors.email}
                  isRequired
                  validationBehavior="aria"
                />
                <Controller
                  name="role"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <Select
                      label="Rola"
                      {...field}
                      isInvalid={!!errors.role}
                      isRequired
                      validationBehavior="aria"
                    >
                      <SelectItem key="user">Użytkownik</SelectItem>
                      <SelectItem key="user_coach">Użytkownik Trener</SelectItem>
                      <SelectItem key="coach">Trener</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" type="submit" endContent={<PersonAdd16Filled />}>
                Wyślij zaproszenie
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
