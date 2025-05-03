import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import {updateAthleteAddressDetails} from '../../../../actions/updateAthlete';

const AddressCard = ({
  athleteId,
  refetchAthleteData,
  streetName,
  houseAndApartmentNumber,
  cityName,
  postalCode,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    try {
      setIsSaving(true);

      const {success} = await updateAthleteAddressDetails({
        id: athleteId,
        streetName: data.streetName,
        houseAndApartmentNumber: data.houseAndApartmentNumber,
        cityName: data.cityName,
        postalCode: data.postalCode,
      });

      if (success) {
        console.log('Changes saved successfully');
        refetchAthleteData();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
      reset();
      setIsEditMode(false);
    }
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
      isSaving={isSaving}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          errors={errors}
          currentStreetName={streetName}
          currentHouseAndApartmentNumber={houseAndApartmentNumber}
          currentCityName={cityName}
          currentPostalCode={postalCode}
        />
      ) : (
        <ReadOnlyContent
          streetName={streetName}
          houseAndApartmentNumber={houseAndApartmentNumber}
          cityName={cityName}
          postalCode={postalCode}
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
  currentHouseAndApartmentNumber,
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
        validationBehavior="aria"
      />
      <Input
        isRequired
        label="Nr domu/mieszkania"
        labelPlacement="outside"
        placeholder="Np. 12"
        isInvalid={!!errors.houseAndApartmentNumber}
        defaultValue={currentHouseAndApartmentNumber}
        {...register('houseAndApartmentNumber', {
          required: {
            value: true,
            message: 'Nr domu/mieszkania jest wymagany',
          },
        })}
        validationBehavior="aria"
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
        validationBehavior="aria"
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
        validationBehavior="aria"
      />
    </CardGrid>
  );
};

export default AddressCard;
