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
import {useState} from 'react';

export default function ScheduleSendingModal({isOpen, onOpenChange}) {
  const [date, setDate] = useState(parseAbsoluteToLocal(new Date().toISOString()));

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Zaplanuj wysłanie wiadomości</ModalHeader>
            <ModalBody>
              <I18nProvider locale="pl-PL">
                <DatePicker
                  label="Data wysłania"
                  hideTimeZone
                  showMonthAndYearPickers
                  disableAnimation
                  value={date}
                  onChange={setDate}
                />
              </I18nProvider>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" onPress={onClose} endContent={<SendClock20Filled />}>
                Dodaj do zaplanowanych
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
