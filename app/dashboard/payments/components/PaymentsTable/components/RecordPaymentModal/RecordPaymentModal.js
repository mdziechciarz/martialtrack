import {createClient} from '@/utils/supabase/client';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {ReceiptAdd20Filled} from '@fluentui/react-icons';
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
  Select,
  SelectItem,
} from '@nextui-org/react';

export default function RecordPaymentModal({isOpen, onOpenChange}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    onOpenChange(false);
  };

  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    // Get all athletes
    const supabase = createClient();

    console.log('Fetching athletes...');
    const fetchAthletes = async () => {
      const {data, error} = await supabase.from('athletes').select('*');
      if (error) {
        setAthletes([]);
      }
      setAthletes(data);
    };

    fetchAthletes();
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Dodaj nowe zamówienie</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Controller
                    name="athlete"
                    control={control}
                    rules={{required: 'Pole zawodnik jest wymagane'}}
                    render={({field}) => (
                      <Autocomplete
                        defaultItems={athletes}
                        // variant="bordered"
                        label="Zawodnik"
                        isRequired
                        isInvalid={!!errors.athlete}
                        onSelectionChange={key => field.onChange({target: {value: key}})}
                        // placeholder="Dla kogo?"
                        // labelPlacement="inside"
                        // className="max-w-xs"
                      >
                        {user => (
                          <AutocompleteItem key={user.id} textValue={user.full_name}>
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
                    type="number"
                    label="Wysokość wpłaty"
                    // placeholder="140.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">PLN</span>
                      </div>
                    }
                    {...register('amount', {
                      required: 'Pole należność jest wymagane',
                      validate: value => value > 0,
                    })}
                    isInvalid={!!errors.amount}
                    isRequired
                  />
                  {/* <Textarea label="Zamówienie" placeholder="Zamówione produkty" /> */}
                  <Select
                    label="Miesiąc"
                    placeholder="Wybierz miesiąc"
                    defaultSelectedKeys="6"
                    {...register('month', {required: true})}
                    isRequired
                    isInvalid={!!errors.month}
                  >
                    <SelectItem key="1">Styczeń</SelectItem>
                    <SelectItem key="2">Luty</SelectItem>
                    <SelectItem key="3">Marzec</SelectItem>
                    <SelectItem key="4">Kwiecień</SelectItem>
                    <SelectItem key="5">Maj</SelectItem>
                    <SelectItem key="6">Czerwiec</SelectItem>
                    <SelectItem key="7">Lipiec</SelectItem>
                  </Select>
                  <Select
                    label="Metoda płatności"
                    // placeholder="Wybierz metodę płatności"
                    defaultSelectedKeys={['cash']}
                    {...register('paymentMethod', {required: true})}
                    isRequired
                    isInvalid={!!errors.paymentMethod}
                  >
                    <SelectItem key="cash">Gotówka</SelectItem>
                    <SelectItem key="transfer">Przelew</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="primary" type="submit" endContent={<ReceiptAdd20Filled />}>
                  Zaksięguj płatność
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
