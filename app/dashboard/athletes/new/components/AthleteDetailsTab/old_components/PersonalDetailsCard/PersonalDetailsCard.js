import {getLocalTimeZone, today} from '@internationalized/date';
import {DatePicker, Input, Select, SelectItem} from '@nextui-org/react';
import {Controller, useFormContext} from 'react-hook-form';

import Card, {CardGrid} from '@/components/Card/Card';

const PersonalDetailsCard = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useFormContext();

  const validatePesel = value => {};

  return (
    <Card title="Dane podstawowe">
      <CardGrid>
        <GenderSelect register={register} errors={errors} />

        <Controller
          name="dateOfBirth"
          control={control}
          rules={{required: 'Data urodzenia jest wymagana'}}
          render={({field}) => (
            <DatePicker
              {...field}
              label="Data urodzenia"
              labelPlacement="outside"
              showMonthAndYearPickers
              isRequired
              disableAnimation
              maxValue={today(getLocalTimeZone())}
              isInvalid={!!errors.dateOfBirth}
              // errorMessage={errors.birthDate?.message}
            />
          )}
        />
        {/* <DatePicker
          label="Data urodzenia"
          labelPlacement="outside"
          showMonthAndYearPickers
          isRequired
          disableAnimation
          maxValue={today(getLocalTimeZone())}
          isInvalid={!!errors.dateOfBirth}
          // errorMessage={errors.birthDate?.message}
        /> */}
        <Input
          label="PESEL"
          placeholder="PESEL"
          labelPlacement="outside"
          isRequired
          isInvalid={!!errors.pesel}
          errorMessage={errors.pesel?.message}
          type="number"
          {...register('pesel', {
            required: {
              value: true,
              message: 'PESEL jest wymagany',
            },
          })}
        />
        <Input
          isRequired
          label="Miejsce urodzenia"
          labelPlacement="outside"
          placeholder="np. Warszawa"
          isInvalid={!!errors.placeOfBirth}
          // errorMessage={errors.birthPlace?.message}
          {...register('placeOfBirth', {
            required: {
              value: true,
              message: 'Miejsce urodzenia jest wymagane',
            },
          })}
        />
      </CardGrid>
    </Card>
  );
};

const GenderSelect = ({errors, register}) => {
  return (
    <Select
      label="Płeć"
      labelPlacement="outside"
      isRequired
      placeholder="Płeć"
      defaultSelectedKeys="1"
      isInvalid={!!errors.sex}
      {...register('sex', {
        required: {
          value: true,
          message: 'Płeć jest wymagana',
        },
      })}
    >
      <SelectItem key="1">Kobieta</SelectItem>
      <SelectItem key="2">Mężczyzna</SelectItem>
    </Select>
  );
};

export default PersonalDetailsCard;
