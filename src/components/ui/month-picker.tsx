"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type MonthGridProps = {
  selectedMonth: Date | null;
  setSelectedMonth: (date: Date | null) => void;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthGrid(props: MonthGridProps) {
  const { selectedMonth, setSelectedMonth } = props;

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(new Date(currentYear, monthIndex, 1));
  };

  return (
    <div className={cn("p-3")}>
      <div className={cn("flex justify-center pt-1 relative items-center")}>
        <Button
          onClick={() => setCurrentYear((prevYear) => prevYear - 1)}
          size="icon"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 text-inherit"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{currentYear}</span>
        <Button
          onClick={() => setCurrentYear((prevYear) => prevYear + 1)}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 text-inherit"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {months.map((month, index) => (
          <Button
            key={month}
            onClick={() => handleMonthClick(index)}
            size="sm"
            variant={
              selectedMonth?.getMonth && selectedMonth.getMonth() === index
                ? "default"
                : "ghost"
            }
            className={cn(
              selectedMonth?.getMonth && selectedMonth.getMonth() === index
                ? "bg-primary"
                : ""
            )}
          >
            {format(new Date(currentYear, index, 1), "MMM")}
          </Button>
        ))}
      </div>
    </div>
  );
}

type MonthPickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export function MonthPicker(props: MonthPickerProps) {
  const { value, onChange } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value
            ? value.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Pick a month"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthGrid selectedMonth={value} setSelectedMonth={onChange} />
      </PopoverContent>
    </Popover>
  );
}
