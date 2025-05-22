import { TimeLog } from '@/features/(dashboard)/types';
import { parseISO, differenceInHours, isValid } from 'date-fns';

 
export const calculateHoursFromTimeLog = (log: TimeLog): number => {
  if (!log.clockInTime || !log.clockOutTime) return 0;

  let hours = 0;
  try {
    const clockInDate = parseISO(log.clockInTime);
    const clockOutDate = parseISO(log.clockOutTime);

    if (!isValid(clockInDate) || !isValid(clockOutDate)) return 0;

    hours = differenceInHours(clockOutDate, clockInDate);

    log.breaks.forEach((br) => {
      if (br.from && br.to) {
        const breakStartTime = parseISO(br.from);
        const breakEndTime = parseISO(br.to);
        if (isValid(breakStartTime) && isValid(breakEndTime)) {
          hours -= differenceInHours(breakEndTime, breakStartTime);
        }
      }
    });
  } catch (error) {
    console.error('Error parsing dates in calculateHoursFromTimeLog:', error);
    return 0; // Return 0 if any date parsing fails
  }

  return Math.max(0, hours);
};
