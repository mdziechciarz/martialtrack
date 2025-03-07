'use client';

import {parseTime} from '@internationalized/date';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Select, SelectItem, TimeInput} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './ScheduleCard.module.css';

export default function ScheduleCard({className, schedule = []}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    unregister,
    reset,
    formState: {errors},
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log(data);
    console.log('Changes saved');
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
      className={className}
      title="Harmonogram zajęć"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? (
        <EditModeContent
          register={register}
          unregister={unregister}
          errors={errors}
          control={control}
          currentSchedule={schedule}
        />
      ) : (
        <ReadOnlyModeContent schedule={schedule} />
      )}
    </Card>
  );
}

const EditModeContent = ({register, unregister, errors, control, currentSchedule = []}) => {
  const initialEntries = currentSchedule.map(entry => ({
    id: entry.id,
    dayOfWeek: entry.day_of_week,
    start: parseTime(entry.start_time),
    end: parseTime(entry.end_time),
  }));

  const [entries, setEntries] = useState(initialEntries || []);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), dayOfWeek: '', start: null, end: null}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`${id}`);
  };

  console.log('currentSchedule', currentSchedule);

  // TODO, DAY OF WEEK -> NUMBER TO TEXT

  return (
    <CardGrid oneColumn>
      {entries.map(entry => (
        <Entry
          key={entry.id}
          id={entry.id}
          handleRemoveEntry={() => handleRemoveEntry(entry.id)}
          dayOfWeek={entry.dayOfWeek}
          start={entry.start}
          end={entry.end}
          register={register}
          errors={errors}
          control={control}
        />
      ))}
      <div className={styles.newEntryButtonContainer}>
        <AddNewEntryButton onClick={handleAddNewEntry} />
      </div>
    </CardGrid>
  );
};

const AddNewEntryButton = ({onClick}) => {
  return (
    <Button size="sm" fullWidth onClick={onClick} variant="light">
      <Add16Filled />
    </Button>
  );
};

const RemoveEntryButton = ({onClick}) => {
  return (
    <Button
      className={styles.removeEntryButton}
      size="sm"
      onClick={onClick}
      isIconOnly
      variant="light"
    >
      <Dismiss16Filled />
    </Button>
  );
};

const Entry = ({id, dayOfWeek, start, end, handleRemoveEntry, register, errors, control}) => {
  return (
    <div className={styles.entry}>
      <Controller
        control={control}
        name={`${id}.dayOfWeek`}
        rules={{required: true}}
        render={({field}) => (
          <Select
            isRequired
            isInvalid={!!errors?.[id]?.dayOfWeek}
            style={{marginRight: 8}}
            label="Dzień tygodnia"
            defaultSelectedKeys={[dayOfWeek]}
            disallowEmptySelection
            {...field}
            validationBehavior="aria"
          >
            <SelectItem key="monday">Poniedziałek</SelectItem>
            <SelectItem key="tuesday">Wtorek</SelectItem>
            <SelectItem key="wednesday">Środa</SelectItem>
            <SelectItem key="thursday">Czwartek</SelectItem>
            <SelectItem key="friday">Piątek</SelectItem>
            <SelectItem key="saturday">Sobota</SelectItem>
            <SelectItem key="sunday">Niedziela</SelectItem>
          </Select>
        )}
      />
      {/* <Select
        isRequired
        isInvalid={!!errors?.[id]?.dayOfWeek}
        style={{marginRight: 8}}
        label="Dzień tygodnia"
        defaultSelectedKeys={[dayOfWeek]}
        disallowEmptySelection
        {...register(`${id}.dayOfWeek`, {required: true})}
      >
        <SelectItem key="monday">Poniedziałek</SelectItem>
        <SelectItem key="tuesday">Wtorek</SelectItem>
        <SelectItem key="wednesday">Środa</SelectItem>
        <SelectItem key="thursday">Czwartek</SelectItem>
        <SelectItem key="friday">Piątek</SelectItem>
        <SelectItem key="saturday">Sobota</SelectItem>
        <SelectItem key="sunday">Niedziela</SelectItem>
      </Select> */}
      <div className={styles.timeInputsContainer}>
        <Controller
          control={control}
          name={`${id}.start`}
          rules={{required: true}}
          render={({field}) => (
            <TimeInput
              label="Start"
              defaultValue={start || null}
              isRequired
              isInvalid={!!errors?.[id]?.start}
              {...field}
              validationBehavior="aria"
              onChange={e => field.onChange(e)}
            />
          )}
        />
        -
        <Controller
          control={control}
          name={`${id}.end`}
          rules={{required: true}}
          render={({field}) => (
            <TimeInput
              label="Koniec"
              defaultValue={end || null}
              isRequired
              isInvalid={!!errors?.[id]?.end}
              {...field}
              validationBehavior="aria"
              onChange={e => field.onChange(e)}
            />
          )}
        />
      </div>
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

const ReadOnlyModeContent = ({schedule}) => {
  const entries = {};

  const mapDayOfWeek = number => {
    switch (number) {
      case 1:
        return 'Poniedziałek';
      case 2:
        return 'Wtorek';
      case 3:
        return 'Środa';
      case 4:
        return 'Czwartek';
      case 5:
        return 'Piątek';
      case 6:
        return 'Sobota';
      case 7:
        return 'Niedziela';
      default:
        throw new Error('Invalid day of week');
    }
  };

  const grouppedSchedule = schedule.reduce((acc, curr) => {
    const dayOfWeek = mapDayOfWeek(curr.day_of_week);

    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = [];
    }

    acc[dayOfWeek].push(curr);

    acc[dayOfWeek] = acc[dayOfWeek].sort((a, b) => {
      return a.start_time.localeCompare(b.start_time);
    });

    return acc;
  }, {});

  return (
    <CardGrid>
      {Object.entries(grouppedSchedule).map(([dayOfWeek, entries]) => (
        <div key={dayOfWeek}>
          <p style={{color: '#4a4a4a', fontSize: 13}}>{dayOfWeek}</p>
          {entries.map(entry => (
            <p key={entry.id}>
              {entry.start_time.slice(0, 5)} - {entry.end_time.slice(0, 5)}
            </p>
          ))}
        </div>
      ))}
    </CardGrid>
  );
};
