import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {Input} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

const AddressCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useFormContext();

  return (
    <Card title="Adres zamieszkania">
      <EditModeContent register={register} errors={errors} />
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
        validationBehavior="aria"
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
