import {SendClock20Filled} from '@fluentui/react-icons';
import {parseAbsoluteToLocal} from '@internationalized/date';
import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import {I18nProvider} from '@react-aria/i18n';
import {Controller, useForm} from 'react-hook-form';

export default function ScheduleSendingModal({isOpen, onOpenChange}) {
  // const [date, setDate] = useState();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Zaplanuj wysłanie wiadomości
              </ModalHeader>
              <ModalBody>
                <I18nProvider locale="pl-PL">
                  <Controller
                    name="sendingDate"
                    control={control}
                    rules={{
                      required: 'Data wysłania jest wymagana',
                      validate: value =>
                        value > new Date().toISOString() || 'Data wysłania musi być w przyszłości',
                    }}
                    render={({field}) => (
                      <DatePicker
                        minValue={parseAbsoluteToLocal(new Date().toISOString())}
                        label="Data wysłania"
                        hideTimeZone
                        showMonthAndYearPickers
                        disableAnimation
                        isInvalid={!!errors.sendingDate}
                        isRequired
                        errorMessage={errors.sendingDate?.message}
                        defaultValue={parseAbsoluteToLocal(
                          new Date(Date.now() + 30 * 60 * 1000).toISOString()
                        )}
                        validationBehavior="aria"
                        {...field}
                        // minValue={parseAbsoluteToLocal(new Date().toISOString())}

                        // onChange={setDate}
                      />
                    )}
                  />
                </I18nProvider>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="primary" type="submit" endContent={<SendClock20Filled />}>
                  Dodaj do zaplanowanych
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
