import {createClient} from '@/utils/supabase/client';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
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

export default function NewOrderModal({isOpen, onOpenChange, handleCreateNewOrder}) {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    // Get all athletes
    const supabase = createClient();

    const fetchAthletes = async () => {
      const {data, error} = await supabase.from('athletes').select('*');
      if (error) {
        setAthletes([]);
      }
      setAthletes(data.map(athlete => ({...athlete, groups: []})));
    };

    fetchAthletes();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    handleCreateNewOrder(data);
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
                <Controller
                  name="recipient"
                  control={control}
                  rules={{required: 'Pole zamawiający jest wymagane'}}
                  render={({field}) => (
                    <Autocomplete
                      {...field}
                      onSelectionChange={key => field.onChange({target: {value: key}})}
                      defaultItems={athletes}
                      label="Zamawiający"
                      placeholder="Dla kogo?"
                      isRequired
                      isInvalid={!!errors.recipient}
                      errorMessage={errors.recipient?.message}
                      validationBehavior="aria"
                    >
                      {user => (
                        <AutocompleteItem key={user.id} textValue={user.full_name} value={user.id}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={user.full_name}
                              className="flex-shrink-0"
                              size="sm"
                              src={user.avatar}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.full_name}</span>
                            </div>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

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
              <Button color="primary" type="submit" endContent={<ReceiptAdd20Filled />}>
                Dodaj
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
