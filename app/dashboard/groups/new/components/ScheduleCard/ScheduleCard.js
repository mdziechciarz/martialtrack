import {useState} from 'react';
import {Controller} from 'react-hook-form';
import {v4} from 'uuid';

import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Button, Select, SelectItem, TimeInput} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import styles from './ScheduleCard.module.css';

export default function ScheduleCard({className, register, errors, control, unregister}) {
  return (
    <Card className={className} title="Harmonogram zajęć">
      <EditModeContent
        register={register}
        unregister={unregister}
        errors={errors}
        control={control}
      />
    </Card>
  );
}

const EditModeContent = ({register, unregister, errors, control}) => {
  const [entries, setEntries] = useState([]);

  const handleAddNewEntry = () => {
    setEntries([...entries, {id: v4(), dayOfWeek: '', start: null, end: null}]);
  };

  const handleRemoveEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    unregister(`schedule.${id}`);
  };

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
        name={`schedule.${id}.dayOfWeek`}
        rules={{required: true}}
        render={({field}) => (
          <Select
            isRequired
            isInvalid={!!errors?.schedule?.[id]?.dayOfWeek}
            style={{marginRight: 8}}
            label="Dzień tygodnia"
            defaultSelectedKeys={[dayOfWeek]}
            disallowEmptySelection
            {...field}
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
      <div className={styles.timeInputsContainer}>
        <Controller
          control={control}
          name={`schedule.${id}.start`}
          rules={{required: true}}
          render={({field}) => (
            <TimeInput
              label="Start"
              defaultValue={start || null}
              isRequired
              isInvalid={!!errors?.schedule?.[id]?.start}
              {...field}
              onChange={e => field.onChange(e)}
            />
          )}
        />
        -
        <Controller
          control={control}
          name={`schedule.${id}.end`}
          rules={{required: true}}
          render={({field}) => (
            <TimeInput
              label="Koniec"
              defaultValue={end || null}
              isRequired
              isInvalid={!!errors?.schedule?.[id]?.end}
              {...field}
              onChange={e => field.onChange(e)}
            />
          )}
        />
      </div>
      <RemoveEntryButton onClick={handleRemoveEntry} />
    </div>
  );
};

const ReadOnlyModeContent = () => {
  return (
    <CardEntries
      entries={{
        Poniedziałek: '16:00 - 17:00',
        Wtorek: '16:00 - 17:00',
        Środa: '16:00 - 17:00',
      }}
    />
  );
};
