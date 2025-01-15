import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

const exampleData = {
  streetName: 'Kwiatowa',
  houseAndApartmentNumber: '12',
  cityName: 'Warszawa',
  postalCode: '12-345',
};

const AddressCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log('Changes saved');
    console.log(data);
    reset();
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    reset();
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      title="Adres zamieszkania"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          errors={errors}
          currentStreetName={exampleData.streetName}
          currentHouseAndAppartmentNumber={exampleData.houseAndApartmentNumber}
          currentCityName={exampleData.cityName}
          currentPostalCode={exampleData.postalCode}
        />
      ) : (
        <ReadOnlyContent
          streetName={exampleData.streetName}
          houseAndApartmentNumber={exampleData.houseAndApartmentNumber}
          cityName={exampleData.cityName}
          postalCode={exampleData.postalCode}
        />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({streetName, houseAndApartmentNumber, cityName, postalCode}) => {
  return (
    <CardEntries
      entries={{
        Ulica: streetName,
        'Numer domu/mieszkania': houseAndApartmentNumber,
        Miasto: cityName,
        'Kod pocztowy': postalCode,
      }}
    />
  );
};

const EditModeContent = ({
  register,
  errors,
  currentStreetName,
  currentHouseAndAppartmentNumber,
  currentCityName,
  currentPostalCode,
}) => {
  return (
    <CardGrid>
      <Input
        isRequired
        label="Ulica"
        labelPlacement="outside"
        placeholder="Np. Kwiatowa"
        isInvalid={!!errors.streetName}
        defaultValue={currentStreetName}
        {...register('streetName', {
          required: {
            value: true,
            message: 'Ulica jest wymagana',
          },
        })}
      />
      <Input
        isRequired
        label="Nr domu/mieszkania"
        labelPlacement="outside"
        placeholder="Np. 12"
        isInvalid={!!errors.houseAndApartmentNumber}
        defaultValue={currentHouseAndAppartmentNumber}
        {...register('houseAndApartmentNumber', {
          required: {
            value: true,
            message: 'Nr domu/mieszkania jest wymagany',
          },
        })}
      />
      <Input
        isRequired
        label="Miasto"
        labelPlacement="outside"
        placeholder="Np. Warszawa"
        isInvalid={!!errors.cityName}
        defaultValue={currentCityName}
        {...register('cityName', {
          required: {
            value: true,
            message: 'Miasto jest wymagane',
          },
        })}
      />
      <Input
        isRequired
        label="Kod pocztowy"
        labelPlacement="outside"
        placeholder="Np. 12-345"
        isInvalid={!!errors.postalCode}
        defaultValue={currentPostalCode}
        {...register('postalCode', {
          required: {
            value: true,
            message: 'Kod pocztowy jest wymagany',
          },
        })}
      />
    </CardGrid>
  );
};

export default AddressCard;
