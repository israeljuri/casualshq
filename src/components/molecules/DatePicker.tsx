/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { format, subDays, isValid } from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import { cn } from '@/lib/utils'; // Assumes you have this from Shadcn/ui setup
import { Button } from '@/components/molecules/Button';
import { Calendar } from '@/components/atoms/calendar'; // CalendarProps for type safety
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover';
import { Input } from '@/components/molecules/Input';

// Define DateRange type from react-day-picker, which Calendar uses
interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DatePreset {
  label: string;
  getValue: () => Date | DateRange;
}

export interface DatePickerProps {
  variant?: 'single' | 'range';
  initialDate?: Date;
  initialDateRange?: DateRange;
  onDateChange?: (date: Date | undefined) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  disabled?: boolean;
  // className?: string; // For PopoverContent
  buttonClassName?: string;
  placeholder?: string;
  rangePlaceholderStart?: string;
  rangePlaceholderEnd?: string;
  // For single date picker, determines if 'Done' button is shown or selection is immediate
  showSingleDoneButton?: boolean;
}

export function DatePicker({
  variant = 'single',
  initialDate,
  initialDateRange,
  onDateChange,
  onDateRangeChange,
  disabled,
  // className,
  buttonClassName,
  placeholder = 'Pick a date',
  rangePlaceholderStart = 'Start date',
  rangePlaceholderEnd = 'End date',
  showSingleDoneButton = true, // Default to showing Done button for single as per new request
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Internal state for selected dates
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    initialDate
  );
  const [selectedRange, setSelectedRange] =
    React.useState<any>(initialDateRange);

  // State for current month view in calendar
  const [month, setMonth] = React.useState<Date | undefined>(
    variant === 'range'
      ? initialDateRange?.startDate || new Date()
      : initialDate || new Date()
  );

  // State for range picker view ("presets" or "custom")
  const [rangePickerView, setRangePickerView] = React.useState<
    'presets' | 'custom'
  >('presets');

  // Input states for custom range
  const [startInput, setStartInput] = React.useState<string>('');
  const [endInput, setEndInput] = React.useState<string>('');

  // Update internal states if initial props change
  React.useEffect(() => {
    setSelectedDate(initialDate);
    if (initialDate) setMonth(initialDate);
  }, [initialDate]);

  React.useEffect(() => {
    setSelectedRange(initialDateRange);
    if (initialDateRange?.startDate) {
      setMonth(initialDateRange.startDate);
      setStartInput(format(initialDateRange.startDate, 'dd/MM/yyyy'));
    } else {
      setStartInput('');
    }
    if (initialDateRange?.endDate) {
      setEndInput(format(initialDateRange.endDate, 'dd/MM/yyyy'));
    } else {
      setEndInput('');
    }
  }, [initialDateRange]);

  // Reset range view when popover opens for range picker
  React.useEffect(() => {
    if (isOpen && variant === 'range') {
      setRangePickerView('presets');
      // Also update input fields if a range is already selected
      if (selectedRange?.startDate)
        setStartInput(format(selectedRange.startDate, 'dd/MM/yyyy'));
      else setStartInput('');
      if (selectedRange?.endDate)
        setEndInput(format(selectedRange.endDate, 'dd/MM/yyyy'));
      else setEndInput('');
    }
  }, [isOpen, variant, selectedRange]);

  const handleSingleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setMonth(date);
    if (!showSingleDoneButton) {
      // Immediate selection if no Done button
      if (onDateChange) onDateChange(date);
      if (date) setIsOpen(false);
    }
  };

  const handleSingleDone = () => {
    if (onDateChange) onDateChange(selectedDate);
    setIsOpen(false);
  };

  const handleRangeCalendarSelect = (range: any) => {
    setSelectedRange(range);
    if (range?.startDate) {
      setStartInput(format(range.startDate, 'dd/MM/yyyy'));
      setMonth(range.startDate);
    } else {
      setStartInput('');
    }
    if (range?.endDate) {
      setEndInput(format(range.endDate, 'dd/MM/yyyy'));
    } else {
      setEndInput('');
    }
  };

  const parseDateInput = (dateString: string): Date | undefined => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const monthVal = parseInt(parts[1], 10) - 1; // Month is 0-indexed in Date
      const year = parseInt(parts[2], 10);
      if (
        !isNaN(day) &&
        !isNaN(monthVal) &&
        !isNaN(year) &&
        String(year).length === 4
      ) {
        const date = new Date(year, monthVal, day);
        if (
          isValid(date) &&
          date.getFullYear() === year &&
          date.getMonth() === monthVal &&
          date.getDate() === day
        ) {
          return date;
        }
      }
    }
    return undefined;
  };

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartInput(value);
    const newStartDate = parseDateInput(value);
    if (newStartDate) {
      setSelectedRange((prev: any) => ({ ...prev, startDate: newStartDate }));
      setMonth(newStartDate);
    } else if (value === '') {
      setSelectedRange((prev: any) => ({ ...prev, startDate: undefined }));
    }
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndInput(value);
    const newEndDate = parseDateInput(value);
    if (newEndDate) {
      setSelectedRange({
        startDate: selectedRange?.startDate,
        endDate: newEndDate,
      });
      if (!selectedRange?.startDate) setMonth(newEndDate);
    } else if (value === '') {
      setSelectedRange({
        startDate: selectedRange?.startDate,
        endDate: undefined,
      });
    }
  };

  const presets: DatePreset[] = [
    {
      label: 'Today',
      getValue: () => ({ startDate: new Date(), endDate: new Date() }),
    },
    {
      label: 'Yesterday',
      getValue: () => ({
        startDate: subDays(new Date(), 1),
        endDate: subDays(new Date(), 1),
      }),
    },
    {
      label: 'Last 7 days',
      getValue: () => ({
        startDate: subDays(new Date(), 6),
        endDate: new Date(),
      }),
    },
    {
      label: 'Last 14 days',
      getValue: () => ({
        startDate: subDays(new Date(), 13),
        endDate: new Date(),
      }),
    },
    {
      label: 'Last 30 days',
      getValue: () => ({
        startDate: subDays(new Date(), 29),
        endDate: new Date(),
      }),
    },
  ];

  const handleRangePresetSelect = (preset: DatePreset) => {
    const value = preset.getValue() as DateRange; // Presets for range return DateRange
    setSelectedRange(value);
    if (value.startDate) setStartInput(format(value.startDate, 'dd/MM/yyyy'));
    if (value.endDate) setEndInput(format(value.endDate, 'dd/MM/yyyy'));
    if (onDateRangeChange) onDateRangeChange(value);
    setIsOpen(false);
  };

  const handleCustomRangeDone = () => {
    // Basic validation: ensure 'from' is before or same as 'to'
    if (
      selectedRange?.startDate &&
      selectedRange?.endDate &&
      selectedRange.startDate > selectedRange.endDate
    ) {
      // Optionally show an error message or swap dates
      alert('Start date must be before or same as end date.');
      return;
    }
    if (onDateRangeChange) onDateRangeChange(selectedRange);
    setIsOpen(false);
  };

  const displayValue = () => {
    if (variant === 'single') {
      return selectedDate ? format(selectedDate, 'dd/MM/yyyy') : placeholder;
    }
    // For range
    if (selectedRange?.startDate && selectedRange?.endDate) {
      return (
        <>
          <span className="hidden md:block">
            {format(selectedRange.startDate, 'dd/MM/yyyy')} -
            {format(selectedRange.endDate, 'dd/MM/yyyy')}
          </span>
          <span className="block md:hidden">
            {format(selectedRange.startDate, 'dd/MM/yyyy')} - ...
          </span>
        </>
      );
    }

    if (selectedRange?.startDate) {
      return `${format(selectedRange.startDate, 'dd/MM/yyyy')} - ...`;
    }

    return placeholder;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          disabled={disabled}
          className={cn(
            'justify-start text-left font-normal',
            !(variant === 'single' ? selectedDate : selectedRange?.startDate) &&
              'text-muted-foreground',
            buttonClassName
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {displayValue()}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        {variant === 'single' && (
          <div className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSingleSelect as (date: Date | undefined) => void} // Type assertion for Calendar's onSelect
              month={month}
              onMonthChange={setMonth}
              initialFocus
              disabled={disabled}
              className="w-full [&_button]:rounded-full [&_button:hover]:bg-accent [&_button:focus-visible]:ring-1"
            />
            {showSingleDoneButton && (
              <div className="grid w-full">
                <Button onClick={handleSingleDone}>Done</Button>
              </div>
            )}
          </div>
        )}

        {variant === 'range' && (
          <>
            {rangePickerView === 'presets' && (
              <div className="p-3 space-y-1">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    className="w-full justify-start px-3 py-1.5 text-sm"
                    onClick={() => handleRangePresetSelect(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
                <div className="border-t my-1"></div> {/* Separator */}
                <Button
                  variant="ghost"
                  className="w-full justify-between px-3 py-1.5 text-sm"
                  onClick={() => setRangePickerView('custom')}
                >
                  Custom Range
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </div>
            )}

            {rangePickerView === 'custom' && (
              <div className="p-3 grid">
                <div className="flex items-center mb-3">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setRangePickerView('presets')}
                    className="mr-auto px-2"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Select Date Range
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    type="text"
                    placeholder={rangePlaceholderStart}
                    value={startInput}
                    onChange={handleStartInputChange}
                    // className="w-full text-sm"
                  />
                  {/* <span className="text-muted-foreground">-</span> */}
                  <Input
                    type="text"
                    placeholder={rangePlaceholderEnd}
                    value={endInput}
                    onChange={handleEndInputChange}
                    // className="w-full text-sm"
                  />
                </div>
                <Calendar
                  mode="range"
                  selected={selectedRange}
                  onSelect={handleRangeCalendarSelect} // Correct typing for onSelect
                  month={month}
                  onMonthChange={setMonth}
                  numberOfMonths={1}
                  disabled={disabled}
                  className="[&_button]:rounded-full [&_button:hover]:bg-accent [&_button:focus-visible]:ring-1" // Example of targeting inner buttons
                />
                <div className="grid w-full">
                  <Button className="w-full" onClick={handleCustomRangeDone}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
