import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Checkmark16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {
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
import styles from './EditParticipantModal.module.css';

const exampleEditedParticipant = {
  name: 'Adam Kowalski',
  athleteId: '1234-1234-1234',
  weight: 75,
  height: 180,
  consentGiven: true,
  startingFeePaid: false,
  categories: [
    {
      ageCategory: 'Junior',
      formula: 'Light-Contact',
      weightAndHeightCategory: '-75kg',
    },
  ],
};

export default function EditParticipantModal({
  isOpen,
  onOpenChange,
  editedParticipant,
  handleUpdateParticipant,
}) {
  const [categories, setCategories] = useState(
    editedParticipant?.categories.map(category => ({...category, id: v4()}))
  );

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log('Submitted');
    data.athlete = editedParticipant.athlete;
    console.log('Saving edited data', data);
    handleUpdateParticipant(data);
    reset();
    onOpenChange(false);
  };

  const handleCancel = onClose => {
    console.log('closing modal');
    reset();
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
            <ModalHeader className="flex flex-col gap-1">Edytuj uczestnika</ModalHeader>
            <ModalBody>
              <div className={styles.container}>
                <Input
                  label="Imię i nazwisko"
                  placeholder="Imię i nazwisko"
                  defaultValue={editedParticipant.athlete.full_name}
                  isDisabled
                />
                <div className={styles.weightAndHeightContainer}>
                  <Input
                    label="Waga"
                    placeholder="Waga"
                    defaultValue={editedParticipant.weight}
                    {...register('weight', {required: 'Waga jest wymagana'})}
                    validationBehavior="aria"
                    isRequired
                    isInvalid={!!errors.weight}
                    errorMessage={errors.weight?.message}
                  />
                  <Input
                    label="Wzrost"
                    placeholder="Wzrost"
                    defaultValue={editedParticipant.height}
                    {...register('height', {required: 'Wzrost jest wymagany'})}
                    validationBehavior="aria"
                    isRequired
                    isInvalid={!!errors.height}
                    errorMessage={errors.height?.message}
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <CustomCheckBox
                    label="Zgoda oddana"
                    defaultChecked={editedParticipant.consent}
                    register={() => register('consent')}
                    isInvalid={!!errors.consent}
                    errorMessage={errors.consent?.message}
                  />
                  <CustomCheckBox
                    label="Startowe opłacone"
                    defaultChecked={editedParticipant.payment}
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
              <Button
                variant="light"
                onPress={() => {
                  handleCancel(onClose);
                }}
              >
                Anuluj
              </Button>
              <Button
                color="primary"
                type="submit"
                endContent={<Checkmark16Filled />}
                isDisabled={!categories.length}
              >
                Zapisz
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
      validationBehavior="aria"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
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
