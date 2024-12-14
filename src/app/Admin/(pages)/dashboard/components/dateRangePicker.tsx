import React, { useEffect } from 'react';
import { Button } from '../../../../../../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Calendar } from "../../../../../../components/ui/calendar";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays, isAfter, parseISO } from "date-fns";

const DateRangePicker = ({ className, date, setDate }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [showCalendar, setShowCalendar] = React.useState(false);

  // Load saved date range on component mount
  useEffect(() => {
    try {
      const savedDateRange = localStorage.getItem('dateRange');
      const savedOption = localStorage.getItem('dateRangeOption');
      
      if (savedDateRange && savedOption) {
        const parsedRange = JSON.parse(savedDateRange);
        
        if (savedOption === 'custom') {
          setDate({
            from: parseISO(parsedRange.from),
            to: parseISO(parsedRange.to)
          });
        } else {
          // For preset options, calculate fresh dates
          const end = new Date();
          let days;
          switch (savedOption) {
            case 'last7days':
              days = 7;
              break;
            case 'last28days':
              days = 28;
              break;
            default: // 'last14days'
              days = 14;
              break;
          }
          const newDates = {
            from: subDays(end, days - 1),
            to: end
          };
          setDate(newDates);
          // Update localStorage with new calculated dates
          localStorage.setItem('dateRange', JSON.stringify({
            from: newDates.from.toISOString(),
            to: newDates.to.toISOString()
          }));
        }
        setSelectedOption(savedOption);
      } else {
        // Default to last 14 days
        const end = new Date();
        const newDates = {
          from: subDays(end, 13),
          to: end
        };
        setDate(newDates);
        setSelectedOption('last14days');
        // Save default selection
        localStorage.setItem('dateRangeOption', 'last14days');
        localStorage.setItem('dateRange', JSON.stringify({
          from: newDates.from.toISOString(),
          to: newDates.to.toISOString()
        }));
      }
    } catch (error) {
      console.error('Error loading date range:', error);
      // Handle error gracefully with defaults
      const end = new Date();
      setDate({
        from: subDays(end, 13),
        to: end
      });
      setSelectedOption('last14days');
    }
  }, [setDate]);

  const handlePresetSelection = (option: string, days: number) => {
    const end = new Date();
    const start = subDays(end, days - 1);
    const newDates = { from: start, to: end };
    setDate(newDates);
    setSelectedOption(option);
    localStorage.setItem('dateRangeOption', option);
    localStorage.setItem('dateRange', JSON.stringify({
      from: start.toISOString(),
      to: end.toISOString()
    }));
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleCustomDateSelection = (newDate: any) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      setSelectedOption('custom');
      localStorage.setItem('dateRangeOption', 'custom');
      localStorage.setItem('dateRange', JSON.stringify({
        from: newDate.from.toISOString(),
        to: newDate.to.toISOString()
      }));
    }
  };

  const disableFutureDates = (date: Date) => {
    const today = new Date();
    return isAfter(date, today);
  };

  const getLabelText = () => {
    switch (selectedOption) {
      case 'last7days':
        return 'Last 7 days';
      case 'last14days':
        return 'Last 14 days';
      case 'last28days':
        return 'Last 28 days';
      case 'custom':
        return date?.from && date?.to
          ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
          : 'Custom Range';
      default:
        return 'Select date range';
    }
  };

useEffect(()=>{
  const saved = localStorage.getItem('dateRangeOption');
     if(saved){
      setSelectedOption(saved)
     }else{
      setSelectedOption('last14days')
     }

},[])


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "md:w-[300px] w-full  justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getLabelText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {!showCalendar ? (
            <div className="grid gap-4 p-4 w-72">
              <Button onClick={() => handlePresetSelection('last7days', 7)} variant="outline">Last 7 days</Button>
              <Button onClick={() => handlePresetSelection('last14days', 14)} variant="outline">Last 14 days</Button>
              <Button onClick={() => handlePresetSelection('last28days', 28)} variant="outline">Last 28 days</Button>
              <Button onClick={() => setShowCalendar(true)} variant="outline">Custom Range</Button>
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                onClick={() => setShowCalendar(false)}
                className="mb-2"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleCustomDateSelection}
                numberOfMonths={2}
                disabled={disableFutureDates}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;