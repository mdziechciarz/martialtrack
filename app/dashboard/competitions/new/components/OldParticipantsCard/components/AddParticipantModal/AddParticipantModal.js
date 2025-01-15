import {useEffect, useState} from 'react';
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form';
import {v4} from 'uuid';

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
import {toast, Toaster} from 'sonner';
import styles from './AddParticipantModal.module.css';

const exampleAthletes = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];

export default function AddParticipantModal({isOpen, onOpenChange}) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = methods;

  const onSubmit = data => {
    // Check at least 1 category is added
    if (!data.categories || data.categories.length === 0) {
      toast.error('Dodaj przynajmniej jedną kategorię');
      console.log('toasting');
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent>
        {onClose => (
          <>
            <FormProvider {...methods}>
              <Toaster richColors position="bottom-center" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Dodaj uczestnika</ModalHeader>
                <ModalBody>
                  <div className={styles.container}>
                    <Controller
                      name="athlete"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <Autocomplete
                          defaultItems={exampleAthletes}
                          label="Zawodnik"
                          placeholder="Wybierz zawodnika"
                          isRequired
                          isInvalid={!!errors.athlete}
                          onSelectionChange={item => field.onChange(item)}
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
                      )}
                    />
                    <div className={styles.weightAndHeightContainer}>
                      <Input
                        label="Waga"
                        placeholder="Waga"
                        type="number"
                        isRequired
                        isInvalid={!!errors.weight}
                        {...register('weight', {required: true})}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">kg</span>
                          </div>
                        }
                      />
                      <Input
                        type="number"
                        label="Wzrost"
                        placeholder="Wzrost"
                        isRequired
                        isInvalid={!!errors.height}
                        {...register('height', {required: true})}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">cm</span>
                          </div>
                        }
                      />
                    </div>
                    <div className={styles.checkboxContainer}>
                      <CustomCheckBox label="Zgoda oddana" register={() => register('consent')} />
                      <CustomCheckBox
                        label="Startowe opłacone"
                        register={() => register('payment')}
                      />
                    </div>
                    <CategoriesList />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Anuluj
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    color="primary"
                    endContent={<PersonAdd20Filled />}
                  >
                    Dodaj
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const CustomCheckBox = ({label, register}) => {
  // const [isSelected, setIsSelected] = useState(false);

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
      // isSelected={isSelected}
      // onValueChange={setIsSelected}
      {...register()}
    >
      <div style={{fontSize: 14}}>{label}</div>
    </Checkbox>
  );
};

const CategoryItem = ({id, index, handleRemoveCategory}) => {
  const {
    unregister,
    register,
    formState: {errors},
  } = useFormContext();

  useEffect(() => {
    return () => {
      // Unregister fields when component is unmounted
      unregister(`categories.${index}.ageCategory`);
      unregister(`categories.${index}.formula`);
      unregister(`categories.${index}.weightOrHeightCategory`);
    };
  }, [index]);

  return (
    <li className={styles.categoryItem}>
      <div className={styles.categoryInputsContainer}>
        <Input
          label="Kat. wiekowa"
          placeholder="Np. Junior"
          isRequired
          isInvalid={!!errors?.categories?.[index]?.ageCategory}
          {...register(`categories.${index}.ageCategory`, {required: true})}
        />
        <Input
          label="Formuła"
          placeholder="Np. Light-Contact"
          isRequired
          isInvalid={!!errors?.categories?.[index]?.formula}
          {...register(`categories.${index}.formula`, {required: true})}
        />
        <Input
          label="Kat. wagowa/wzrostowa"
          placeholder="Np. -75kg"
          isRequired
          isInvalid={!!errors?.categories?.[index]?.weightOrHeightCategory}
          {...register(`categories.${index}.weightOrHeightCategory`, {required: true})}
        />
      </div>
      <RemoveItemButton
        onClick={() => {
          handleRemoveCategory(id);
        }}
      />
    </li>
  );
};

const RemoveItemButton = ({onClick}) => {
  return (
    <Button
      className={styles.removeItemButton}
      size="sm"
      onPress={onClick}
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

const CategoriesList = ({}) => {
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    setCategories(prev => [...prev, v4()]);
  };

  const handleRemoveCategory = id => {
    console.log('removeButtonClick');
    setCategories(prev => prev.filter(item => item !== id));
  };

  return (
    <div className={styles.categoriesContainer}>
      <p>Startuje w kategoriach:</p>
      <ul className={styles.categoriesList}>
        {/* <CategoryItem /> */}
        {categories.map((id, index) => (
          <CategoryItem
            key={id}
            id={id}
            index={index}
            handleRemoveCategory={handleRemoveCategory}
          />
        ))}
      </ul>
      <AddItemButton onClick={handleAddCategory} />
    </div>
  );
};
