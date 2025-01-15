import {PersonAdd20Filled} from '@fluentui/react-icons';
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
} from '@nextui-org/react';
import {useState} from 'react';

const exampleAthletes = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];

export default function AddMemberModal({isOpen, onOpenChange}) {
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const handleClose = () => {
    setSelectedAthlete(null);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" onClose={handleClose}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj zawodnika do grupy</ModalHeader>
            <ModalBody>
              <Autocomplete
                defaultItems={exampleAthletes}
                label="Zawodnik"
                placeholder="Wybierz zawodnika"
                selectedKey={selectedAthlete}
                onSelectionChange={setSelectedAthlete}
              >
                {user => (
                  <AutocompleteItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={user.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{user.name}</span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={onClose}
                endContent={<PersonAdd20Filled />}
                isDisabled={!selectedAthlete}
              >
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
