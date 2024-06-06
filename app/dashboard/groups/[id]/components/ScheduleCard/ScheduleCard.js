import Card, {CardEntries} from '@/components/Card/Card';
import {Add16Filled} from '@fluentui/react-icons';
import {Button, TimeInput} from '@nextui-org/react';
import {useEffect, useState} from 'react';

import styles from './ScheduleCard.module.css';

export default function ScheduleCard({className}) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      className={className}
      title="Harmonogram zajęć"
      isEditable
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? <EditModeContent /> : <ReadOnlyModeContent />}
    </Card>
  );
}

const EditModeContent = () => {
  const [activatedDay, setActivatedDay] = useState(null);

  const handleDeactivate = event => {
    if (!event.target.closest(`.${styles.entry}`)) {
      setActivatedDay(null);
    }
  };

  useEffect(() => {
    if (activatedDay !== null) {
      document.addEventListener('mousedown', handleDeactivate);
    } else {
      document.removeEventListener('mousedown', handleDeactivate);
    }

    return () => {
      document.removeEventListener('mousedown', handleDeactivate);
    };
  }, [activatedDay]);

  return (
    <div className={styles.contentContainer}>
      {['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'].map(day => (
        <DayTimeInput
          key={day}
          day={day}
          isActivated={activatedDay === day}
          // isActivated={true}
          setActivatedDay={setActivatedDay}
        />
      ))}
    </div>
  );
};

const DayTimeInput = ({day, isActivated, setActivatedDay}) => {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  const formatTime = value => {
    if (!value) return '';
    const hours = String(value.hour).padStart(2, '0');
    const minutes = String(value.minute).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={styles.entry}>
      <p className={styles.key}>{day}</p>
      {isActivated ? (
        <div className={styles.timeInputsContainer}>
          <TimeInput label={null} value={startValue} onChange={setStartValue} />
          -
          <TimeInput label={null} value={endValue} onChange={setEndValue} />
        </div>
      ) : startValue && endValue ? (
        <p
          className={styles.value}
          style={{textAlign: 'center', cursor: 'pointer'}}
          onClick={() => setActivatedDay(day)}
        >
          {formatTime(startValue)} - {formatTime(endValue)}
        </p>
      ) : (
        <Button
          className={styles.addTimeButton}
          size="sm"
          fullWidth
          onClick={() => setActivatedDay(day)}
          variant="light"
        >
          <Add16Filled />
        </Button>
      )}
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
