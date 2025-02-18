import Card, {CardEntries, CardGrid} from '@/components/Card/Card';
import {parseDate} from '@internationalized/date';
import {DateRangePicker, Input, Select, SelectItem} from '@nextui-org/react';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import styles from './MainInfoCard.module.css';

const getLevelName = level => {
  switch (level) {
    case 'worldChampionship':
      return 'Mistrzostwa Świata';
    case 'europeanChampionship':
      return 'Mistrzostwa Europy';
    case 'worldCup':
      return 'Puchar Świata';
    case 'europeanCup':
      return 'Puchar Europy';
    case 'nationalChampionship':
      return 'Mistrzostwa Polski';
    case 'nationalCup':
      return 'Puchar Polski';
    case 'regionalChampionship':
      return 'Zawody regionalne';
    case 'other':
      return 'Inne';
    default:
      return '';
  }
};

const MainInfoCard = ({className, dates, location, color, level}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log(data);
    console.log('Changes saved');
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      title="Informacje podstawowe"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      className={`${className || ''}`}
    >
      {isEditMode ? (
        <EditableContent
          currentColor={color}
          currentDates={dates}
          currentLocation={location}
          currentLevel={level}
          register={register}
          control={control}
          errors={errors}
        />
      ) : (
        <ReadOnlyContent color={color} dates={dates} location={location} level={level} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({dates, location, color, level}) => {
  return (
    <CardEntries
      nonTextValues
      entries={{
        Data: `${dates.start} - ${dates.end}`,
        Lokalizacja: location,
        Kolor: <input className={styles.colorInput} type="color" defaultValue={color} disabled />,
        Ranga: getLevelName(level),
      }}
    />
  );
};

const EditableContent = ({
  register,
  control,
  errors,
  currentColor,
  currentLocation,
  currentDates,
  currentLevel,
}) => {
  return (
    <CardGrid oneColumn>
      {/* <Input
        label="Nazwa zawodów"
        labelPlacement="outside"
        placeholder="Wpisz nazwę zawodów"
        isRequired
        {...register('name', {required: true})}
        isInvalid={!!errors.name}
      /> */}
      <Controller
        name="date"
        control={control}
        defaultValue={{
          start: parseDate(currentDates.start),
          end: parseDate(currentDates.end),
        }}
        rules={{
          required: true,
          // Validate that the end date is after the start date
          validate: value => {
            const {start, end} = value || {};
            if (!start || !end) {
              return 'Data jest wymagana.';
            }
            const startDate = new Date(start.year, start.month - 1, start.day);
            const endDate = new Date(end.year, end.month - 1, end.day);

            if (endDate < startDate) {
              return 'Data końcowa nie może być wcześniejsza niż początkowa.';
            }
            return true;
          },
        }}
        render={({field}) => (
          <DateRangePicker
            label="Data"
            labelPlacement="outside"
            calendarProps={{showMonthAndYearPickers: true, disableAnimation: true}}
            isRequired
            isInvalid={!!errors.date}
            errorMessage={errors.date?.message}
            {...field}
            validationBehavior="aria"
          />
        )}
      />

      <Input
        label="Lokalizacja"
        labelPlacement="outside"
        placeholder="Wpisz lokalizację"
        defaultValue={currentLocation}
        isInvalid={!!errors.location}
        {...register('location', {required: true})}
        validationBehavior="aria"
      />
      <Select
        label="Ranga zawodów"
        labelPlacement="outside"
        placeholder="Wybierz rangę"
        isRequired
        defaultSelectedKeys={[currentLevel]}
        isInvalid={!!errors.level}
        disallowEmptySelection
        {...register('level', {required: true})}
        validationBehavior="aria"
      >
        <SelectItem key="worldChampionship">Mistrzostwa Świata</SelectItem>
        <SelectItem key="europeanChampionship">Mistrzostwa Europy</SelectItem>
        <SelectItem key="worldCup">Puchar Świata</SelectItem>
        <SelectItem key="europeanCup">Puchar Europy</SelectItem>
        <SelectItem key="nationalChampionship">Mistrzostwa Polski</SelectItem>
        <SelectItem key="nationalCup">Puchar Polski</SelectItem>
        <SelectItem key="regionalChampionship">Zawody regionalne</SelectItem>
        <SelectItem key="other">Inne</SelectItem>
      </Select>
      <Input
        className={`${styles.editColorInput}`}
        classNames={{inputWrapper: styles.editColorInputWrapper}}
        style={{cursor: 'pointer'}}
        type="color"
        defaultValue={currentColor}
        label="Kolor"
        labelPlacement="outside"
        {...register('color')}
        validationBehavior="aria"
      />
    </CardGrid>
  );
};

// export default SectionColorCard;
export default MainInfoCard;
