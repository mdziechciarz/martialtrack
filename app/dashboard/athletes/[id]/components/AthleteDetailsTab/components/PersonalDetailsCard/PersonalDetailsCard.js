import {getLocalTimeZone, parseDate, today} from '@internationalized/date';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {DatePicker, Input, Select, SelectItem} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import {updateAthletePersonalDetails} from '../../../../actions/updateAthlete';

const sexOptions = [
  {name: 'Mężczyzna', value: '1'},
  {name: 'Kobieta', value: '2'},
];

const PersonalDetailsCard = ({
  athleteId,
  dateOfBirth,
  pesel,
  placeOfBirth,
  sex,
  refetchAthleteData,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    try {
      setIsLoading(true);

      const {success} = await updateAthletePersonalDetails({
        id: athleteId,
        dateOfBirth: data.dateOfBirth.toString(),
        pesel: data.pesel,
        placeOfBirth: data.placeOfBirth,
        sex: data.sex,
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
      setIsLoading(false);
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
      title="Dane podstawowe"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      isSaving={isLoading}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          errors={errors}
          control={control}
          currentDataOfBirth={dateOfBirth}
          currentPesel={pesel}
          currentPlaceOfBirth={placeOfBirth}
          currentSex={sex}
        />
      ) : (
        <ReadOnlyContent
          sex={sex}
          dateOfBirth={dateOfBirth}
          placeOfBirth={placeOfBirth}
          pesel={pesel}
        />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({dateOfBirth, pesel, placeOfBirth, sex}) => {
  return (
    <CardEntries
      entries={{
        Płeć: sexOptions.find(option => option.value === sex.toString())?.name || 'Nieznana',
        'Data urodzenia': dateOfBirth,
        PESEL: pesel,
        'Miejsce urodzenia': placeOfBirth,
      }}
    />
  );
};

const EditModeContent = ({
  register,
  errors,
  control,
  currentDataOfBirth,
  currentPesel,
  currentPlaceOfBirth,
  currentSex,
}) => {
  return (
    <CardGrid>
      <GenderSelect register={register} errors={errors} defaultValue={currentSex} />

      <Controller
        name="dateOfBirth"
        control={control}
        rules={{required: 'Data urodzenia jest wymagana'}}
        defaultValue={currentDataOfBirth ? parseDate(currentDataOfBirth) : undefined}
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
            validationBehavior="aria"
            errorMessage={errors.dateOfBirth?.message}
          />
        )}
      />
      <Input
        label="PESEL"
        placeholder="PESEL"
        labelPlacement="outside"
        isRequired
        isInvalid={!!errors.pesel}
        errorMessage={errors.pesel?.message}
        type="number"
        defaultValue={currentPesel}
        {...register('pesel', {
          required: {
            value: true,
            message: 'PESEL jest wymagany',
          },
        })}
        validationBehavior="aria"
      />
      <Input
        isRequired
        label="Miejsce urodzenia"
        labelPlacement="outside"
        placeholder="np. Warszawa"
        isInvalid={!!errors.placeOfBirth}
        defaultValue={currentPlaceOfBirth}
        // errorMessage={errors.birthPlace?.message}
        {...register('placeOfBirth', {
          required: {
            value: true,
            message: 'Miejsce urodzenia jest wymagane',
          },
        })}
        validationBehavior="aria"
      />
    </CardGrid>
  );
};

const GenderSelect = ({errors, register, defaultValue}) => {
  return (
    <Select
      label="Płeć"
      labelPlacement="outside"
      isRequired
      placeholder="Płeć"
      defaultSelectedKeys={new Set([defaultValue.toString()])}
      isInvalid={!!errors.sex}
      {...register('sex', {
        required: {
          value: true,
          message: 'Płeć jest wymagana',
        },
      })}
      validationBehavior="aria"
    >
      {sexOptions.map(option => (
        <SelectItem key={option.value} value={option.value}>
          {option.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PersonalDetailsCard;
