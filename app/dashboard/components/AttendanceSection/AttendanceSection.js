'use client';

import {Checkmark12Regular} from '@fluentui/react-icons';
import {Ripple, useRipple} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useRef} from 'react';
import styles from './AttendanceSection.module.css';

// Example attendanceLists array
const exampleAttendanceLists = {
  monday: [
    {
      name: 'Kickboxing Zawodnicy',
      color: 'red',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'blue',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Dzieci',
      color: 'green',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
  ],
  tuesday: [
    {
      name: 'Yoga',
      color: 'yellow',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'blue',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
  ],
  wednesday: [
    {
      name: 'Kickboxing Zawodnicy',
      color: 'purple',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'orange',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Dzieci',
      color: 'black',
      times: '18:30 - 20:00',
    },
    {
      name: 'Kickboxing Dzieci',
      color: 'green',
      times: '18:30 - 20:00',
    },
  ],
  thursday: [
    {
      name: 'Yoga',
      color: 'yellow',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'blue',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
  ],
  friday: [
    {
      name: 'Kickboxing Zawodnicy',
      color: 'purple',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'orange',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Dzieci',
      color: 'black',
      times: '18:30 - 20:00',
    },
    {
      name: 'Kickboxing Dzieci',
      color: 'green',
      times: '18:30 - 20:00',
    },
  ],
  saturday: [
    {
      name: 'Yoga',
      color: 'yellow',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 17,
        totalMembers: 20,
      },
    },
    {
      name: 'Kickboxing Juniorzy',
      color: 'blue',
      times: '18:30 - 20:00',
      attendanceList: {
        attendeesCount: 20,
        totalMembers: 20,
      },
    },
  ],
};

const AttendanceSection = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Listy obecności</h3>
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

  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
    router.push(`/dashboard/attendance/${name}`);
  };

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

export default AttendanceSection;
