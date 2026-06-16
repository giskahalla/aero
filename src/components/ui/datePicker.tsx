'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown, CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { type DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "./calendar"

import { TIME } from "@/utils"


interface DatePickerProps {
    value?: Date
    onChange?: (date: Date) => void
}

export function MonthYearPicker({ value, onChange }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)


    const MONTHS = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const [currentYear, setCurrentYear] = React.useState<number>(
        value ? value.getFullYear() : new Date().getFullYear()
    )

    const handleMonthSelect = (monthIndex: number) => {
        const newDate = date ? new Date(date) : new Date()
        newDate.setFullYear(currentYear)
        newDate.setMonth(monthIndex)
        newDate.setDate(1) 
        
        setDate(newDate)
        if (onChange) onChange(newDate)
        setOpen(false) 
    }

    return (
        <Field className="w-38">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date"
                    className="justify-between font-normal"
                >
                    {TIME.parseMonthYear(value ? value.toISOString() : "")}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 overflow-hidden p-0" align="start">
                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                    <Button
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => setCurrentYear((prev) => prev - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-semibold">{currentYear}</span>
                    <Button
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => setCurrentYear((prev) => prev + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Grid Month */}
                <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((month, index) => {
                    const isSelected =
                    value &&
                    value.getMonth() === index &&
                    value.getFullYear() === currentYear

                    const isCurrentMonthNow = 
                    new Date().getMonth() === index && 
                    new Date().getFullYear() === currentYear

                    return (
                    <Button
                        key={month}
                        variant={isSelected ? "default" : "ghost"}
                        className={cn(
                            "h-10 text-sm font-normal",
                            isCurrentMonthNow && !isSelected && "border border-primary text-primary"
                        )}
                        onClick={() => handleMonthSelect(index)}
                    >
                        {month}
                    </Button>
                    )
                })}
                </div>
            </PopoverContent>
        </Popover>
        </Field>
    )
}

export function RangeDatePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  return (
    <Field className="mx-auto w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value} 
          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {value ? format(value, 'dd/MM/yyyy') : <span>Pick a date</span>}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="w-2xs"
          // mode="single"
          selected={value}     
          onSelect={onChange}  
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  )
}
