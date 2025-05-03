'use client';

import {
  CalendarAdd16Filled,
  Checkmark12Regular,
  ChevronCircleLeft16Filled,
  ChevronCircleLeft16Regular,
  ChevronCircleRight16Filled,
  ChevronCircleRight16Regular,
  PresenceBlocked10Regular,
} from '@fluentui/react-icons';

import styles from './AttendanceSection.module.css';

import {today} from '@internationalized/date';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Ripple,
  Spinner,
  useDisclosure,
  useRipple,
} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {fetchClassOccurrences, fetchGroupSchedules} from '../../actions';
import {
  formatDate,
  formatDateForDb,
  formatTime,
  getDayNameEnglish,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getWeekNumber,
  isDayComplete,
} from './dateHelpers';

import NewCustomClassOccurrenceModal from './components/NewCustomClassOccurrenceModal/NewCustomClassOccurrenceModal';

const AttendanceSection = () => {
  // Get current date, week number, and year
  const todayDate = new Date();
  const [currentWeek, setCurrentWeek] = useState(getWeekNumber(todayDate));
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [attendanceData, setAttendanceData] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Calculate week date range
  const firstDay = getFirstDayOfWeek(currentWeek, currentYear);
  const lastDay = getLastDayOfWeek(currentWeek, currentYear);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch real data for past days and today
      const pastEndDate = new Date();
      const pastStartDate = new Date(firstDay);

      if (lastDay < pastEndDate) {
        pastEndDate.setTime(lastDay.getTime());
      }

      const classOccurrences = await fetchClassOccurrences(
        formatDateForDb(pastStartDate),
        formatDateForDb(pastEndDate)
      );

      // Fetch schedules for future days
      const groupSchedules = await fetchGroupSchedules();

      // Organize data by days of the week
      const weekData = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };

      console.log('classOccurrences', classOccurrences);

      // Process past and current class occurrences
      classOccurrences.forEach(occurrence => {
        const occurrenceDate = new Date(occurrence.date);
        const dayIndex = occurrenceDate.getDay() || 7;
        const dayName = getDayNameEnglish(dayIndex).toLowerCase();

        if (weekData[dayName]) {
          // Count attendance
          const attendeesCount = occurrence.class_attendance?.filter(a => a.is_present).length || 0;
          const totalMembers = occurrence.class_attendance?.length || 0;

          weekData[dayName].push({
            id: occurrence.id,
            name: occurrence.groups.name,
            color: occurrence.groups.color || '#aaaaaa',
            times: `${formatTime(occurrence.start_time)} - ${formatTime(occurrence.end_time)}`,
            attendanceList: {
              attendeesCount,
              totalMembers,
            },
            isCanceled: occurrence.status === 'canceled',
            isPast: true,
          });
        }
      });

      const todayDayIndex = todayDate.getDay() || 7; // Convert Sunday (0) to 7
      const todayWeek = getWeekNumber(todayDate);

      const futureOccurrences = groupSchedules.filter(
        schedule =>
          (currentWeek == todayWeek && schedule.day_of_week > todayDayIndex) ||
          currentWeek > todayWeek
      );

      futureOccurrences.forEach(schedule => {
        const dayIndex = schedule.day_of_week;
        const dayName = getDayNameEnglish(dayIndex).toLowerCase();

        weekData[dayName].push({
          id: `future-${schedule.id}`,
          name: schedule.groups.name,
          color: schedule.groups.color || '#aaaaaa',
          times: `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`,
          isFuture: true,
        });
      });

      setAttendanceData(weekData);
      setIsLoading(false);
    };

    fetchData();
  }, [currentWeek, currentYear]);

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    } else {
      // Go to last week of previous year
      setCurrentYear(currentYear - 1);
      setCurrentWeek(getWeekNumber(new Date(currentYear - 1, 11, 31)));
    }
  };

  const handleNextWeek = () => {
    const lastWeekOfYear = getWeekNumber(new Date(currentYear, 11, 31));

    if (currentWeek < lastWeekOfYear) {
      setCurrentWeek(currentWeek + 1);
    } else {
      // Go to first week of next year
      setCurrentYear(currentYear + 1);
      setCurrentWeek(1);
    }
  };

  const handleCalendarSelect = date => {
    if (date) {
      const selectedDate = new Date(date);
      setCurrentWeek(getWeekNumber(selectedDate));
      setCurrentYear(selectedDate.getFullYear());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <WeekPicker
          week={currentWeek}
          year={currentYear}
          firstDay={firstDay}
          lastDay={lastDay}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onDateSelect={handleCalendarSelect}
        />
        <Button variant="light" isIconOnly onPress={onOpen}>
          <CalendarAdd16Filled />
        </Button>
        <NewCustomClassOccurrenceModal isOpen={isOpen} onOpenChange={onClose} />
      </div>
      <div className={styles.grid}>
        {isLoading ? (
          <div
            style={{
              gridColumn: '1 / -1',
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner />
          </div>
        ) : (
          <>
            <DayColumn
              dayName="Poniedziałek"
              isComplete={isDayComplete(attendanceData.monday)}
              attendanceLists={attendanceData.monday}
            />
            <DayColumn
              dayName="Wtorek"
              isComplete={isDayComplete(attendanceData.tuesday)}
              attendanceLists={attendanceData.tuesday}
            />
            <DayColumn
              dayName="Środa"
              isComplete={isDayComplete(attendanceData.wednesday)}
              attendanceLists={attendanceData.wednesday}
            />
            <DayColumn
              dayName="Czwartek"
              isComplete={isDayComplete(attendanceData.thursday)}
              attendanceLists={attendanceData.thursday}
            />
            <DayColumn
              dayName="Piątek"
              isComplete={isDayComplete(attendanceData.friday)}
              attendanceLists={attendanceData.friday}
            />
            {attendanceData?.saturday?.length > 0 && (
              <DayColumn
                dayName="Sobota"
                isComplete={isDayComplete(attendanceData.saturday)}
                attendanceLists={attendanceData.saturday}
              />
            )}
            {attendanceData?.sunday?.length > 0 && (
              <DayColumn
                dayName="Niedziela"
                isComplete={isDayComplete(attendanceData.sunday)}
                attendanceLists={attendanceData.sunday}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Rest of the component code (DayColumn, AttendanceCard, WeekPicker)
const DayColumn = ({
  dayName: dayOfWeek,
  isComplete = false,
  attendanceLists = [],
  isLoading = false,
}) => {
  return (
    <div className={styles.dayColumnContainer}>
      <div className={styles.dayColumnHeader}>
        <p>{dayOfWeek}</p>
        {isComplete && <Checkmark12Regular />}
      </div>
      <div className={styles.dayColumnContent}>
        {isLoading ? (
          <div className={styles.loadingPlaceholder}>Ładowanie...</div>
        ) : attendanceLists.length > 0 ? (
          attendanceLists.map((attendanceList, index) => (
            <AttendanceCard key={attendanceList.id || index} {...attendanceList} />
          ))
        ) : (
          <div className={styles.emptyDay}>Brak zajęć</div>
        )}
      </div>
    </div>
  );
};

const AttendanceCard = ({
  id,
  name,
  color,
  times,
  attendanceList = null,
  isCanceled = false,
  isFuture = false,
}) => {
  const router = useRouter();

  const handleClick = e => {
    // Only navigate if this is a past class with an actual ID
    if (!isFuture && id) {
      domRef.current && onRippleClickHandler(e);
      router.push(`/dashboard/attendance/${id}`);
    }
  };

  const domRef = useRef(null);
  const {onPress: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  return (
    <div
      onClick={handleClick}
      className={`${styles.attendanceCardContainer} ${isCanceled ? styles.canceled : ''} ${
        isFuture ? styles.future : ''
      }`}
      style={{borderLeftColor: color, position: 'relative', overflow: 'hidden'}}
      ref={domRef}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
      <div className={styles.classDetailsContainer}>
        <p>{name}</p>
        <p>{times}</p>
      </div>
      {attendanceList && !isCanceled && !isFuture && (
        <div className={styles.attendanceDetailsContainer}>
          <Checkmark12Regular />
          <p>
            {attendanceList.attendeesCount}/{attendanceList.totalMembers}
          </p>
        </div>
      )}
      {isCanceled && (
        <div
          className={`${styles.attendanceDetailsContainer} ${isCanceled ? styles.canceled : ''}`}
        >
          <PresenceBlocked10Regular />
        </div>
      )}
      {isFuture && (
        <div className={`${styles.attendanceDetailsContainer} ${styles.future}`}>
          {/* Future indicator could go here if needed */}
        </div>
      )}
    </div>
  );
};

const WeekPicker = ({week, year, firstDay, lastDay, onPreviousWeek, onNextWeek, onDateSelect}) => {
  const formatWeekRange = () => {
    return `${formatDate(firstDay)}-${formatDate(lastDay)} ${year}`;
  };

  return (
    <div className={styles.weekPickerContainer}>
      <div className={styles.prevButtonContainer}>
        <Button
          className={styles.weekPickerButton}
          isIconOnly
          variant="light"
          color="primary"
          onClick={onPreviousWeek}
        >
          <ChevronCircleLeft16Regular />
          <ChevronCircleLeft16Filled />
        </Button>
      </div>
      <Popover placement="bottom" classNames={{content: styles.popoverBase}} disableAnimation>
        <PopoverTrigger>
          <div className={styles.weekContainer}>
            <p className={styles.week}>{formatWeekRange()}</p>
            <p className={styles.weekNumber}>(Tydzień {week})</p>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            className={styles.calendar}
            showMonthAndYearPickers
            onChange={date => onDateSelect(date)}
            defaultValue={week == getWeekNumber(new Date()) ? today() : undefined}
          />
        </PopoverContent>
      </Popover>
      <div className={styles.nextButtonContainer}>
        <Button
          className={styles.weekPickerButton}
          isIconOnly
          variant="light"
          color="primary"
          onClick={onNextWeek}
        >
          <ChevronCircleRight16Regular />
          <ChevronCircleRight16Filled />
        </Button>
      </div>
    </div>
  );
};

export default AttendanceSection;
