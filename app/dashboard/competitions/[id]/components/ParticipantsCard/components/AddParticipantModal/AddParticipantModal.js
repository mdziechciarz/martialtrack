import {Add16Filled, Dismiss16Filled, PersonAdd20Filled} from '@fluentui/react-icons';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import classNames from 'classnames';
import {useState} from 'react';
import styles from './AddParticipantModal.module.css';

const exampleAthletes = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];

export default function AddParticipantModal({isOpen, onOpenChange}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj uczestnika</ModalHeader>
            <ModalBody>
              <div className={styles.container}>
                <Autocomplete
                  defaultItems={exampleAthletes}
                  // variant="bordered"
                  label="Zawodnik"
                  placeholder="Wybierz zawodnika"
                  // labelPlacement="inside"
                  // className="max-w-xs"
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
                <div className={styles.weightAndHeightContainer}>
                  <Input label="Waga" placeholder="Waga" />
                  <Input label="Wzrost" placeholder="Wzrost" />
                </div>
                <div className={styles.checkboxContainer}>
                  <CustomCheckBox label="Zgoda oddana" />
                  <CustomCheckBox label="Startowe opłacone" />
                </div>
                <div className={styles.categoriesContainer}>
                  <p>Startuje w kategoriach:</p>
                  <ul className={styles.categoriesList}>
                    <CategoryItem />
                    {/* <CategoryItem /> */}
                    {/* <CategoryItem /> */}
                  </ul>
                  <AddItemButton />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" onPress={onClose} endContent={<PersonAdd20Filled />}>
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const CustomCheckBox = ({label}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox
      classNames={{
        base: classNames(
          styles.checkboxBase,
          'inline-flex w-full max-w-md bg-content1',
          'hover:bg-content3'
        ),
        label: 'w-full',
      }}
      label={label}
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      <div style={{fontSize: 14}}>{label}</div>
    </Checkbox>
  );
};

const CategoryItem = ({}) => {
  return (
    <li className={styles.categoryItem}>
      <div className={styles.categoryInputsContainer}>
        <Input label="Kat. wiekowa" placeholder="Np. Junior" />
        <Input label="Formuła" placeholder="Np. Light-Contact" />
        <Input label="Kat. wagowa/wzrostowa" placeholder="Np. -75kg" />
      </div>
      <RemoveItemButton />
    </li>
  );
};

const RemoveItemButton = ({onClick}) => {
  return (
    <Button
      className={styles.removeItemButton}
      size="sm"
      onClick={onClick}
      isIconOnly
      variant="light"
    >
      <Dismiss16Filled />
    </Button>
  );
};

const AddItemButton = ({onClick}) => {
  return (
    <Button
      className={styles.addItemButton}
      fullWidth
      onClick={onClick}
      variant="ghost"
      // color="secondary"
    >
      <Add16Filled />
    </Button>
  );
};
