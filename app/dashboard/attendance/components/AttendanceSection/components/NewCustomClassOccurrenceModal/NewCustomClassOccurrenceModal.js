import {createClient} from '@/utils/supabase/client';
import {CalendarAdd16Filled} from '@fluentui/react-icons';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TimeInput,
} from '@nextui-org/react';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

export default function NewCustomClassOccurenceModal({isOpen, onOpenChange}) {
  const supabase = createClient();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const {data, error} = await supabase.from('groups').select('*');

      if (error) {
        console.error('Error fetching groups:', error);
      }

      setGroups(data || []);
    };

    fetchGroups();
  }, []);

  const handleCreateClassOccurrence = async ({groupId, date, start, end}) => {
    const {data: classOccurrencesData, error} = await supabase.from('class_occurrences').insert([
      {
        group_id: groupId,
        date: date,
        start_time: start,
        end_time: end,
      },
    ]);

    if (error) {
      console.error('Error creating class occurrence:', error);
      return;
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = data => {
    // console.log(data);
    handleCreateClassOccurrence({
      groupId: data.group,
      date: data.date.toString(),
      start: data.start.toString(),
      end: data.end.toString(),
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Dodaj niestandardowe zajęcia</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Controller
                  name="group"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <Autocomplete
                      {...field}
                      defaultItems={groups}
                      onSelectionChange={key => field.onChange({target: {value: key}})}
                      label="Grupa"
                      placeholder="Wybierz grupę"
                      isRequired
                      isInvalid={!!errors.group}
                      validationBehavior="aria"
                    >
                      {group => (
                        <AutocompleteItem key={group.id} textValue={group.name}>
                          <div className="flex gap-2 items-center">
                            <span
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                backgroundColor: group.color,
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{group.name}</span>
                            </div>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="date"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <DatePicker
                      {...field}
                      label="Data"
                      placeholder="Wybierz datę"
                      isRequired
                      isInvalid={errors?.date}
                      validationBehavior="aria"
                    />
                  )}
                />
                <div style={{display: 'flex', gap: 8}}>
                  <Controller
                    control={control}
                    name={`start`}
                    rules={{required: true}}
                    render={({field}) => (
                      <TimeInput
                        {...field}
                        label="Początek"
                        isRequired
                        isInvalid={errors?.start}
                        validationBehavior="aria"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`end`}
                    rules={{required: true}}
                    render={({field}) => (
                      <TimeInput
                        {...field}
                        label="Koniec"
                        isRequired
                        isInvalid={errors?.end}
                        validationBehavior="aria"
                      />
                    )}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleClose}>
                Anuluj
              </Button>
              <Button color="primary" endContent={<CalendarAdd16Filled />} type="submit">
                Dodaj
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
