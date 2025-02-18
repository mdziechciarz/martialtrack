import {createClient} from '@/utils/supabase/client';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
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

import styles from './AddParticipantModal.module.css';

export default function AddParticipantModal({isOpen, onOpenChange, handleAddParticipant}) {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    // Get all athletes
    const supabase = createClient();

    const fetchAthletes = async () => {
      // const {data, error} = await supabase.from('athletes').select('*');
      const {data, error} = await supabase.from('athletes').select(`
    *,
    group_members (
      groups(*)
    )
  `);

      if (error) {
        setAthletes([]);
      }
      setAthletes(data);
    };

    fetchAthletes();
  }, []);

  const [categories, setCategories] = useState([]);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const athlete = athletes.find(athlete => athlete.id === data.athlete);

    if (!athlete) {
      return;
    }

    data.athlete = athlete;
    handleAddParticipant(data);
    console.log(data);
    reset();
    setCategories([]);
    onOpenChange(false);
  };

  const handleCancel = onClose => {
    reset();
    setCategories([]);
    onClose();
  };

  const handleAddNewCategory = () => {
    setCategories(prev => [
      ...prev,
      {id: v4(), ageCategory: '', formula: '', weightAndHeightCategory: ''},
    ]);
  };

  const handleRemoveCategory = id => {
    setCategories(prev => prev.filter(category => id !== category.id));
    unregister(`categories.${id}`);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Dodaj uczestnika</ModalHeader>
            <ModalBody>
              <div className={styles.container}>
                <Controller
                  name="athlete"
                  control={control}
                  rules={{required: 'Pole zawodnik jest wymagane'}}
                  render={({field}) => (
                    <Autocomplete
                      {...field}
                      validationBehavior="aria"
                      onSelectionChange={key => field.onChange({target: {value: key}})}
                      defaultItems={athletes}
                      label="Zawodnik"
                      placeholder="Wybierz zawodnika"
                      isRequired
                      isInvalid={!!errors.athlete}
                      errorMessage={errors.athlete?.message}
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
                <div className={styles.weightAndHeightContainer}>
                  <Input
                    label="Waga"
                    placeholder="Waga"
                    {...register('weight', {required: 'Waga jest wymagana'})}
                    validationBehavior="aria"
                    type="number"
                    isRequired
                    isInvalid={!!errors.weight}
                    errorMessage={errors.weight?.message}
                  />
                  <Input
                    label="Wzrost"
                    placeholder="Wzrost"
                    {...register('height', {required: 'Wzrost jest wymagany'})}
                    validationBehavior="aria"
                    type="number"
                    isRequired
                    isInvalid={!!errors.height}
                    errorMessage={errors.height?.message}
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <CustomCheckBox
                    label="Zgoda oddana"
                    register={() => register('consent')}
                    isInvalid={!!errors.consent}
                    errorMessage={errors.consent?.message}
                  />
                  <CustomCheckBox
                    label="Startowe opłacone"
                    register={() => register('payment')}
                    isInvalid={!!errors.payment}
                    errorMessage={errors.payment?.message}
                  />
                </div>
                <div className={styles.categoriesContainer}>
                  <p>Startuje w kategoriach:</p>
                  <ul className={styles.categoriesList}>
                    {categories.map(category => (
                      <CategoryItem
                        {...category}
                        id={category.id}
                        key={category.id}
                        register={register}
                        errors={errors}
                        handleRemoveCategory={() => handleRemoveCategory(category.id)}
                      />
                    ))}
                  </ul>
                  <AddItemButton isDisabled={!categories.length} onClick={handleAddNewCategory} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                type="submit"
                endContent={<PersonAdd20Filled />}
                isDisabled={!categories.length}
              >
                Dodaj
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

const CustomCheckBox = ({label, defaultChecked = false, register, isInvalid, errorMessage}) => {
  const [isSelected, setIsSelected] = useState(defaultChecked);

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
      {...register()}
      isInvalid={isInvalid}
      // errorMessage={errorMessage}
      validationBehavior="aria"
    >
      <div style={{fontSize: 14}}>{label}</div>
    </Checkbox>
  );
};

const CategoryItem = ({
  id,
  ageCategory,
  formula,
  weightAndHeightCategory,
  handleRemoveCategory,
  register,
  unregister,
  errors,
}) => {
  return (
    <li className={styles.categoryItem}>
      <div className={styles.categoryInputsContainer}>
        <Input
          label="Kat. wiekowa"
          placeholder="Np. Junior"
          isRequired
          defaultValue={ageCategory}
          {...register(`categories.${id}].ageCategory`, {
            required: true,
          })}
          validationBehavior="aria"
          isInvalid={!!errors?.categories?.[id]?.ageCategory}
        />
        <Input
          label="Formuła"
          placeholder="Np. Light-Contact"
          isRequired
          defaultValue={formula}
          {...register(`categories.${id}].formula`, {
            required: true,
          })}
          validationBehavior="aria"
          isInvalid={!!errors?.categories?.[id]?.formula}
        />
        <Input
          label="Kat. wagowa/wzrostowa"
          placeholder="Np. -75kg"
          isRequired
          defaultValue={weightAndHeightCategory}
          {...register(`categories.${id}].weightAndHeightCategory`, {
            required: true,
          })}
          validationBehavior="aria"
          isInvalid={!!errors?.categories?.[id]?.weightAndHeightCategory}
        />
      </div>
      <RemoveItemButton onClick={handleRemoveCategory} />
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
      onPress={onClick}
      variant="ghost"
      // color="secondary"
    >
      <Add16Filled />
    </Button>
  );
};
