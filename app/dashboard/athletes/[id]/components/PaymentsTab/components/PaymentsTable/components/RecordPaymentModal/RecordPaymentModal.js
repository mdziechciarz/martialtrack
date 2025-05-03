import {createClient} from '@/utils/supabase/client';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {ReceiptAdd20Filled} from '@fluentui/react-icons';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';

import {recordManualPaymentByMonth} from '@/app/dashboard/payments/actions/recordManualPayment';

const monthOptions = [
  {name: 'Styczeń', uid: '1'},
  {name: 'Luty', uid: '2'},
  {name: 'Marzec', uid: '3'},
  {name: 'Kwiecień', uid: '4'},
  {name: 'Maj', uid: '5'},
  {name: 'Czerwiec', uid: '6'},
  {name: 'Lipiec', uid: '7'},
  {name: 'Sierpień', uid: '8'},
  {name: 'Wrzesień', uid: '9'},
  {name: 'Październik', uid: '10'},
  {name: 'Listopad', uid: '11'},
  {name: 'Grudzień', uid: '12'},
];

export default function RecordPaymentModal({isOpen, onOpenChange, refetchPayments}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    try {
      console.log('Submitting payment data:', data);

      const response = await recordManualPaymentByMonth({
        athleteId: data.athlete,
        month: data.month,
        year: data.year,
        paymentMethod: data.paymentMethod,
      });
      if (response.success) {
        console.log('Payment recorded successfully:', response.data);
        refetchPayments();
        onOpenChange(false);
        reset();
        // Optionally, you can show a success message or perform any other action
      } else {
        console.error('Failed to record payment:', response.error);
        // Optionally, you can show an error message
      }
    } catch (err) {
      console.error('Error recording payment:', err);
      // Optionally, you can show an error message
    }

    reset();
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

  const currentMonth = (new Date().getMonth() + 1).toString();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Zaksięguj wpłatę</ModalHeader>
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
                        validationBehavior="aria"
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
                  <div className="flex gap-2">
                    <Select
                      label="Miesiąc"
                      placeholder="Wybierz miesiąc"
                      defaultSelectedKeys={[currentMonth]}
                      isRequired
                      isInvalid={!!errors.month}
                      validationBehavior="aria"
                      {...register('month', {required: true})}
                    >
                      {monthOptions.map(month => (
                        <SelectItem key={month.uid} textValue={month.name}>
                          {month.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Rok"
                      placeholder="Wybierz rok"
                      defaultSelectedKeys={[new Date().getFullYear().toString()]}
                      isRequired
                      isInvalid={!!errors.year}
                      validationBehavior="aria"
                      {...register('year', {required: true})}
                    >
                      <SelectItem key="2023">2023</SelectItem>
                      <SelectItem key="2024">2024</SelectItem>
                      <SelectItem key="2025">2025</SelectItem>
                      <SelectItem key="2026">2026</SelectItem>
                    </Select>
                  </div>

                  <Select
                    label="Metoda płatności"
                    // placeholder="Wybierz metodę płatności"
                    defaultSelectedKeys={['cash']}
                    isRequired
                    isInvalid={!!errors.paymentMethod}
                    {...register('paymentMethod', {required: true})}
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
