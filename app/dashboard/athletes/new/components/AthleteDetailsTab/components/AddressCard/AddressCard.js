import {useFormContext} from 'react-hook-form';

import Card, {CardGrid} from '@/components/Card/Card';
import {Input} from '@nextui-org/react';

const AddressCard = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  return (
    <Card title="Adres zamieszkania">
      <CardGrid>
        <Input
          isRequired
          label="Ulica"
          labelPlacement="outside"
          placeholder="Np. Kwiatowa"
          isInvalid={!!errors.streetName}
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
          {...register('postalCode', {
            required: {
              value: true,
              message: 'Kod pocztowy jest wymagany',
            },
          })}
        />
      </CardGrid>
    </Card>
  );
};

export default AddressCard;
