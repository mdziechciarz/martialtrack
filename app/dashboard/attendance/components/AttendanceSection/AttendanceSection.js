'use client';

import {
  Checkmark12Regular,
  ChevronCircleLeft16Filled,
  ChevronCircleLeft16Regular,
  ChevronCircleRight16Filled,
  ChevronCircleRight16Regular,
} from '@fluentui/react-icons';

import styles from './AttendanceSection.module.css';

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Ripple,
  useRipple,
} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useRef} from 'react';
import exampleAttendanceLists from './exampleData';

const AttendanceSection = () => {
  return (
    <div className={styles.container}>
      {/* <h3 className={styles.sectionTitle}>Listy obecności</h3> */}
      <div className={styles.header}>
        <WeekPicker />
      </div>
      <div className={styles.grid}>
        <DayColumn
          dayName="Poniedziałek"
          isComplete
          attendanceLists={exampleAttendanceLists.monday}
        />
        <DayColumn dayName="Wtorek" isComplete attendanceLists={exampleAttendanceLists.tuesday} />
        <DayColumn dayName="Środa" attendanceLists={exampleAttendanceLists.wednesday} />
        <DayColumn dayName="Czwartek" attendanceLists={exampleAttendanceLists.thursday} />
        <DayColumn dayName="Piątek" attendanceLists={exampleAttendanceLists.friday} />
        <DayColumn dayName="Sobota" attendanceLists={exampleAttendanceLists.saturday} />
      </div>
    </div>
  );
};

const DayColumn = ({dayName: dayOfWeek, isComplete = false, attendanceLists = []}) => {
  return (
    <div className={styles.dayColumnContainer}>
      <div className={styles.dayColumnHeader}>
        <p>{dayOfWeek}</p>
        {isComplete && <Checkmark12Regular />}
      </div>
      <div className={styles.dayColumnContent}>
        {attendanceLists.map((attendanceList, index) => (
          <AttendanceCard key={index} {...attendanceList} />
        ))}
      </div>
    </div>
  );
};

const AttendanceCard = ({name, color, times, attendanceList = null}) => {
  const router = useRouter();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
    router.push(`/dashboard/attendance/${name}`);
  };

  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  return (
    <div
      onClick={handleClick}
      className={styles.attendanceCardContainer}
      style={{borderLeftColor: color, position: 'relative', overflow: 'hidden'}}
      ref={domRef}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
      <div className={styles.classDetailsContainer}>
        <p>{name}</p>
        <p>{times}</p>
      </div>
      {attendanceList && (
        <div className={styles.attendanceDetailsContainer}>
          <Checkmark12Regular />
          <p>
            {attendanceList.attendeesCount}/{attendanceList.totalMembers}
          </p>
        </div>
      )}
    </div>
  );
};

const WeekPicker = () => {
  return (
    <div className={styles.weekPickerContainer}>
      <div className={styles.prevButtonContainer}>
        <Button className={styles.weekPickerButton} isIconOnly variant="light" color="primary">
          <ChevronCircleLeft16Regular />
          <ChevronCircleLeft16Filled />
        </Button>
      </div>
      <Popover placement="bottom" classNames={{content: styles.popoverBase}} disableAnimation>
        <PopoverTrigger>
          <div className={styles.weekContainer}>
            <p className={styles.week}>12-18 Lutego 2024</p>
            <p className={styles.weekNumber}>(Tydzień 7)</p>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar className={styles.calendar} showMonthAndYearPickers />
        </PopoverContent>
      </Popover>
      <div className={styles.nextButtonContainer}>
        <Button className={styles.weekPickerButton} isIconOnly variant="light" color="primary">
          <ChevronCircleRight16Regular />
          <ChevronCircleRight16Filled />
        </Button>
      </div>
    </div>
  );
};

export default AttendanceSection;
