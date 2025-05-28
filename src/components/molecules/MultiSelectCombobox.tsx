// src/components/ui/manual-multi-select-combobox.tsx
'use client';

import * as React from 'react';
import { ChevronsUpDown, X, Search as SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/molecules/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover';
import { Checkbox } from '@/components/atoms/checkbox';
import { Badge } from '@/components/atoms/badge';
import { ScrollArea } from '@/components/atoms/scroll-area';
import { Input } from '@/components/molecules/Input'; // Using Input for search

export interface Option {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectComboboxProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptySearchText?: string;
  doneButtonText?: string;
  triggerClassName?: string;
  maxDisplaySelected?: number;
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = 'Search...',
  searchPlaceholder = 'Filter options',
  emptySearchText = 'No options found.',
  doneButtonText = 'Done',
  triggerClassName,
  maxDisplaySelected = 2,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [popoverSelected, setPopoverSelected] =
    React.useState<string[]>(selected);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      setPopoverSelected(selected);
      setSearchTerm(''); // Reset search term when closing
    }
  }, [selected, open]);

  const handleSelectOption = (value: string) => {
    setPopoverSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleDone = () => {
    onChange(popoverSelected);
    setOpen(false);
  };

  const handleRemoveBadge = (valueToRemove: string) => {
    const newSelected = selected.filter((value) => value !== valueToRemove);
    onChange(newSelected);
    setPopoverSelected(newSelected);
  };

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const getSelectedLabels = (values: string[]) => {
    return values
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean) as string[];
  };

  const selectedLabels = getSelectedLabels(selected);

  const triggerLabel = () => {
    if (selectedLabels.length === 0) return placeholder;
    if (selectedLabels.length <= maxDisplaySelected) {
      return selectedLabels.join(', ');
    }
    return `${selectedLabels.length} selected`;
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between min-h-[38px] h-auto py-3',
              selected.length > 0
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-muted-foreground',
              triggerClassName
            )}
            onClick={() => {
              if (!open) setPopoverSelected(selected);
              setOpen(!open);
            }}
          >
            <span className="truncate text-base pr-2">{triggerLabel()}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="flex items-center border-b px-3">
            <SearchIcon className="-mr-8 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full text-sm bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none pl-10"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-500px)] overflow-y-auto">
            {filteredOptions.length === 0 && (
              <p className="p-4 py-10 text-sm text-center text-muted-foreground">
                {emptySearchText}
              </p>
            )}
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className="cursor-pointer flex items-center p-2 hover:bg-accent text-sm p-4"
                role="option"
                aria-selected={popoverSelected.includes(option.value)}
              >
                <label
                  onClick={() => handleSelectOption(option.value)}
                  htmlFor={`checkbox-${option.value}`} // Not strictly necessary if parent div handles click
                  className="cursor-pointer flex-1"
                >
                  {option.label}
                </label>
                <Checkbox
                  id={`checkbox-${option.value}`}
                  checked={popoverSelected.includes(option.value)}
                  onCheckedChange={() => handleSelectOption(option.value)} // This will also trigger if label is clicked due to parent onClick
                  className="mr-2"
                  onClick={(e) => e.stopPropagation()} // Prevent double toggle if checkbox itself is clicked
                />
              </div>
            ))}
          </ScrollArea>
          <div className="p-2 py-4">
            <Button onClick={handleDone} size="md" className="w-full">
              {doneButtonText}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {getSelectedLabels(selected).map((label, index) => (
            <Badge
              variant="secondary"
              key={selected[index]}
              className="flex items-center gap-1 rounded-sm border border-primary bg-primary-100 text-primary"
            >
              {label}
              <button
                aria-label={`Remove ${label}`}
                onClick={() => handleRemoveBadge(selected[index])}
                className="outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
