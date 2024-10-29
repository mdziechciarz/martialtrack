import {createClient} from '@/utils/supabase/client';
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
  Textarea,
} from '@nextui-org/react';
import {useEffect, useState} from 'react';

const exampleAthletes = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];

export default function NewOrderModal({isOpen, onOpenChange}) {
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

  console.log(athletes);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj nowe zamówienie</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Autocomplete
                  defaultItems={athletes}
                  // variant="bordered"
                  label="Zamawiający"
                  placeholder="Dla kogo?"
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
                <Input
                  type="number"
                  label="Należność"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">PLN</span>
                    </div>
                  }
                />
                <Textarea label="Zamówienie" placeholder="Zamówione produkty" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" onPress={onClose} endContent={<ReceiptAdd20Filled />}>
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
