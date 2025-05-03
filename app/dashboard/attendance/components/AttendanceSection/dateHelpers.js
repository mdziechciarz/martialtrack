/**
 * Date and time utility functions for the attendance section
 */

// Helper functions for week calculations
export const getWeekNumber = date => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  // Adjust to make Monday the first day (Sunday becomes day 7)
  const dayOfWeek = date.getDay() || 7;
  // Remove the extra +7 that was causing the week number to be too high
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() - 1) / 7);
};

export const getFirstDayOfWeek = (weekNumber, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  // Adjust the day offset calculation to make Monday day 1 instead of Sunday
  const dayOfFirstJan = firstDayOfYear.getDay() || 7; // Convert Sunday (0) to 7
  const daysOffset = (weekNumber - 1) * 7 - (dayOfFirstJan - 2);
  return new Date(year, 0, daysOffset);
};

export const getLastDayOfWeek = (weekNumber, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  // Adjust the day offset calculation to make Monday day 1 instead of Sunday
  const dayOfFirstJan = firstDayOfYear.getDay() || 7; // Convert Sunday (0) to 7
  // Calculate the offset to the last day of the week (Sunday)
  const daysOffset = (weekNumber - 1) * 7 - (dayOfFirstJan - 2) + 6;
  return new Date(year, 0, daysOffset);
};

export const formatDate = date => {
  const options = {day: 'numeric', month: 'short'};
  return date.toLocaleDateString('pl-PL', options);
};

// Format time from database format to display format
export const formatTime = timeStr => {
  if (!timeStr) return '';

  // Assuming timeStr is in format "HH:MM:SS"
  const timeParts = timeStr.split(':');
  return `${timeParts[0]}:${timeParts[1]}`;
};

// Convert day number (0-6) to name
export const getDayName = dayNumber => {
  const days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ];
  return days[dayNumber];
};

export const getDayNameEnglish = dayNumber => {
  const days = [
    'Niedziela',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Niedziela',
  ];
  return days[dayNumber];
};

// Format database day_of_week to local day index
export const convertDayOfWeek = dayOfWeek => {
  // Assuming dayOfWeek in database is 1-7 where 1 is Monday and 7 is Sunday
  // Convert to JS format where 0 is Sunday and 6 is Saturday
  if (dayOfWeek === 7) {
    return 0; // Sunday
  } else {
    return dayOfWeek; // Monday(1) through Saturday(6)
  }
};

// Format dates for database queries
export const formatDateForDb = date => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Check if a day has all attendance marked
export const isDayComplete = dayClasses => {
  if (!dayClasses || dayClasses.length === 0) return false;

  // Day is complete if all past classes have attendance checked
  const pastClasses = dayClasses.filter(cls => cls.isPast && !cls.isFuture);
  if (pastClasses.length === 0) return false;

  return pastClasses.every(
    cls => cls.attendanceList && cls.attendanceList.attendeesCount !== undefined
  );
};
