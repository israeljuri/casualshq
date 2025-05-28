 
import { parseISO, differenceInHours, isValid } from 'date-fns';
import { format, differenceInMinutes } from 'date-fns';
import { Staff, TimeLog } from '../types/staff.type';
 
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



export const getPaginatedStaffList = (
  staffs: Staff[],
  currentPage: number,
  pageSize: number
) => {
  const totalStaffCount = staffs.length;
  const totalPages = Math.ceil(totalStaffCount / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = staffs.slice(start, end);

  return {
    isLoading: false,
    data: paginatedData,
    currentPage,
    totalPages,
    totalStaffCount,
    pageSize,
  };
};



interface StaffTimeSummary {
  lastClockIn?: string | undefined;
  lastClockOut?: string | undefined;
  totalBreakTime: string;
  totalHoursWorked: string;
  lastWorkDate: string;
}
// Helper to convert minutes to human-readable format
const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours * 10) / 10} hour${hours !== 1 ? 's' : ''}`;
  const days = hours / 24;
  return `${Math.round(days * 10) / 10} day${days !== 1 ? 's' : ''}`;
};

export const getStaffTimeSummary = (staff: Staff): StaffTimeSummary => {
  const logs = staff.timeLogs || [];

  if (logs.length === 0) {
    return {
      lastClockIn: '',
      lastClockOut: '',
      totalBreakTime: '0 minutes',
      totalHoursWorked: '0 minutes',
      lastWorkDate: ''
    };
  }

  let lastClockInDate: Date | null = null;
  let lastClockOutDate: Date | null = null;
  let totalBreakMinutes = 0;
  let totalWorkMinutes = 0;

  for (const log of logs) {
    const clockIn = new Date(log.clockInTime);
    const clockOut = log.clockOutTime ? new Date(log.clockOutTime) : null;

    // Update last clockIn/clockOut
    if (!lastClockInDate || clockIn > lastClockInDate) {
      lastClockInDate = clockIn;
    }
    if (clockOut && (!lastClockOutDate || clockOut > lastClockOutDate)) {
      lastClockOutDate = clockOut;
    }

    if (clockOut) {
      const shiftMinutes = differenceInMinutes(clockOut, clockIn);

      let breakMinutes = 0;
      if (log.breaks) {
        for (const brk of log.breaks) {
          const start = new Date(brk.from);
          const end = new Date(brk.to);
          breakMinutes += differenceInMinutes(end, start);
        }
      }

      totalBreakMinutes += breakMinutes;
      totalWorkMinutes += shiftMinutes - breakMinutes;
    }
  }

  return {
    lastClockIn: lastClockInDate ? format(lastClockInDate, 'hh:mm a') : '',
    lastClockOut: lastClockOutDate ? format(lastClockOutDate, 'hh:mm a') : '',
    totalBreakTime: formatDuration(totalBreakMinutes),
    totalHoursWorked: formatDuration(totalWorkMinutes),
    lastWorkDate: lastClockOutDate ? format(lastClockOutDate, 'PP') : ''
  };
};