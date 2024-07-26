import {ReceiptAdd20Filled} from '@fluentui/react-icons';
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

const exampleAthletes = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];

export default function RecordPaymentModal({isOpen, onOpenChange}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj nowe zamówienie</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  label="Wysokość wpłaty"
                  // placeholder="140.00"
                  defaultValue={140}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">PLN</span>
                    </div>
                  }
                />
                {/* <Textarea label="Zamówienie" placeholder="Zamówione produkty" /> */}
                <Select label="Miesiąc" placeholder="Wybierz miesiąc" defaultSelectedKeys="6">
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
                  defaultSelectedKeys="cash"
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
              <Button color="primary" onPress={onClose} endContent={<ReceiptAdd20Filled />}>
                Zaksięguj płatność
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
