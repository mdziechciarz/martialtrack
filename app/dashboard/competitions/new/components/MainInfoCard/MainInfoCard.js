import Card, {CardGrid} from '@/components/Card/Card';
import {DateRangePicker, Input, Select, SelectItem} from '@nextui-org/react';
import {Controller} from 'react-hook-form';
import styles from './MainInfoCard.module.css';

const MainInfoCard = ({className, register, control, errors}) => {
  return (
    <Card title="Informacje podstawowe" className={`${className || ''}`}>
      <CardGrid oneColumn>
        <Input
          label="Nazwa zawodów"
          labelPlacement="outside"
          placeholder="Wpisz nazwę zawodów"
          isRequired
          {...register('name', {required: true})}
          isInvalid={!!errors.name}
        />
        <Controller
          name="date"
          control={control}
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
            />
          )}
        />

        <Input
          label="Lokalizacja"
          labelPlacement="outside"
          placeholder="Wpisz lokalizację"
          {...register('location')}
        />
        <Select
          label="Ranga zawodów"
          labelPlacement="outside"
          placeholder="Wybierz rangę"
          isRequired
          isInvalid={!!errors.level}
          disallowEmptySelection
          defaultSelectedKeys={['nationalChampionship']}
          {...register('level', {required: true})}
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
          className={`${styles.colorInput} ${styles.editable}`}
          classNames={{inputWrapper: styles.colorInputWrapper}}
          style={{cursor: 'pointer'}}
          type="color"
          defaultValue="#7070FF"
          label="Kolor"
          labelPlacement="outside"
          {...register('color')}
        />
      </CardGrid>
    </Card>
  );
};

// export default SectionColorCard;
export default MainInfoCard;
