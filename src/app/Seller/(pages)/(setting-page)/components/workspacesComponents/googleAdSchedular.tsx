// @ts-nocheck
'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useToast } from '../../../../../../../components/ui/toaster'
import { TimeBlock } from './services/adPreferencesService'

interface AdScheduleProps {
  adSchedule: TimeBlock[]
  setAdSchedule: (schedule: TimeBlock[]) => void
}

function convertScheduleToApiFormat(
  schedule: Record<string, number[]>,
): TimeBlock[] {
  const dayToNumber: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }

  const hourToMinutes: Record<number, number> = {
    0: 0, // 12 AM = 0 minutes
    1: 120, // 2 AM = 120 minutes
    2: 240, // 4 AM = 240 minutes
    3: 360, // 6 AM = 360 minutes
    4: 480, // 8 AM = 480 minutes
    5: 600, // 10 AM = 600 minutes
    6: 720, // 12 PM = 720 minutes
    7: 780, // 1 PM = 780 minutes
    8: 840, // 2 PM = 840 minutes
    9: 960, // 4 PM = 960 minutes
    10: 1080, // 6 PM = 1080 minutes
    11: 1200, // 8 PM = 1200 minutes
    12: 1320, // 10 PM = 1320 minutes
  }

  const timeBlocks: TimeBlock[] = []

  Object.entries(schedule).forEach(([day, hours]) => {
    if (day === 'Every Day') return

    if (hours.length === 0) return

    const sortedHours = [...hours].sort((a, b) => a - b)
    let currentBlock: number[] = [sortedHours[0]]

    for (let i = 1; i <= sortedHours.length; i++) {
      if (
        i === sortedHours.length ||
        sortedHours[i] !== sortedHours[i - 1] + 1
      ) {
        const startMinute = hourToMinutes[currentBlock[0]]
        const endMinute =
          hourToMinutes[currentBlock[currentBlock.length - 1]] + 60

        const existingBlock = timeBlocks.find(
          (block) =>
            block.start_minute === startMinute &&
            block.end_minute === endMinute,
        )

        if (existingBlock) {
          existingBlock.days.push(dayToNumber[day])
          existingBlock.days.sort((a, b) => a - b)
        } else {
          timeBlocks.push({
            days: [dayToNumber[day]],
            start_minute: startMinute,
            end_minute: endMinute,
            timezone_type: 'USER',
          })
        }

        if (i < sortedHours.length) {
          currentBlock = [sortedHours[i]]
        }
      } else {
        currentBlock.push(sortedHours[i])
      }
    }
  })

  return timeBlocks.sort((a, b) => a.days[0] - b.days[0])
}

function convertApiFormatToSchedule(
  timeBlocks: TimeBlock[],
): Record<string, number[]> {
  const numberToDay: Record<number, string> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  const minutesToHour: Record<number, number> = {
    0: 0, // 12 AM
    120: 1, // 2 AM
    240: 2, // 4 AM
    360: 3, // 6 AM
    480: 4, // 8 AM
    600: 5, // 10 AM
    720: 6, // 12 PM
    780: 7, // 1 PM
    840: 8, // 2 PM
    960: 9, // 4 PM
    1080: 10, // 6 PM
    1200: 11, // 8 PM
    1320: 12, // 10 PM
  }

  const schedule: Record<string, number[]> = {
    'Every Day': [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  }

  timeBlocks.forEach((block) => {
    const startHour = minutesToHour[block.start_minute]
    const endHour = minutesToHour[block.end_minute - 60]

    if (startHour !== undefined && endHour !== undefined) {
      const hours = []
      for (let hour = startHour; hour <= endHour; hour++) {
        hours.push(hour)
      }

      block.days.forEach((day) => {
        const dayName = numberToDay[day]
        if (dayName) {
          schedule[dayName] = [
            ...new Set([...schedule[dayName], ...hours]),
          ].sort((a, b) => a - b)
        }
      })
    }
  })

  // Update 'Every Day' based on other days
  const allHours = Array.from({ length: 13 }, (_, i) => i)
  schedule['Every Day'] = allHours.filter((hour) =>
    Object.entries(schedule)
      .filter(([day]) => day !== 'Every Day')
      .every(([_, hours]) => hours.includes(hour)),
  )

  return schedule
}

export default function AdScheduleComponent({
  adSchedule,
  setAdSchedule,
}: AdScheduleProps) {
  // Initialize schedule state from props using the conversion function
  const [schedule, setSchedule] = useState(() => {
    return adSchedule.length > 0
      ? convertApiFormatToSchedule(adSchedule)
      : {
          'Every Day': [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        }
  })

  const { toast } = useToast()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)
  const previousScheduleRef = useRef(schedule)

  const days = [
    'Every Day',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const hours = [
    '12 am',
    '2 am',
    '4 am',
    '6 am',
    '8 am',
    '10 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '4 pm',
    '6 pm',
    '8 pm',
    '10 pm',
  ]

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ day: '', hour: -1 })
  const [dragEnd, setDragEnd] = useState({ day: '', hour: -1 })
  const [isSelecting, setIsSelecting] = useState(true)
  const tableRef = useRef(null)

  // Only update the schedule when adSchedule prop changes and it's different from current schedule
  useEffect(() => {
    if (!isInitialMount.current && adSchedule.length > 0) {
      const newSchedule = convertApiFormatToSchedule(adSchedule)
      if (JSON.stringify(newSchedule) !== JSON.stringify(schedule)) {
        setSchedule(newSchedule)
      }
    }
    isInitialMount.current = false
  }, [adSchedule]) // Only depend on adSchedule prop

  const saveChanges = useCallback(
    (newSchedule: Record<string, number[]>) => {
      const apiSchedule = convertScheduleToApiFormat(newSchedule)
      // if (apiSchedule.length === 0) return

      const prevScheduleStr = JSON.stringify(previousScheduleRef.current)
      const newScheduleStr = JSON.stringify(newSchedule)

      if (prevScheduleStr !== newScheduleStr) {
        setAdSchedule(apiSchedule)
        previousScheduleRef.current = newSchedule
      }
    },
    [setAdSchedule],
  )

  // Debounced auto-save
  useEffect(() => {
    if (!isInitialMount.current) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveChanges(schedule)
      }, 1000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [schedule, saveChanges])

  const toggleSchedule = (day: string, hour: number, forceState?: boolean) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev }
      const isSelected =
        forceState !== undefined ? forceState : !prev[day].includes(hour)

      if (day === 'Every Day') {
        days.forEach((d) => {
          if (isSelected) {
            if (!newSchedule[d].includes(hour)) {
              newSchedule[d] = [...newSchedule[d], hour].sort((a, b) => a - b)
            }
          } else {
            newSchedule[d] = newSchedule[d].filter((h) => h !== hour)
          }
        })
      } else {
        if (isSelected) {
          if (!newSchedule[day].includes(hour)) {
            newSchedule[day] = [...newSchedule[day], hour].sort((a, b) => a - b)
          }
        } else {
          newSchedule[day] = newSchedule[day].filter((h) => h !== hour)
        }

        // Update 'Every Day' based on other days
        newSchedule['Every Day'] = hours
          .map((_, index) => index)
          .filter((h) => days.slice(1).every((d) => newSchedule[d].includes(h)))
      }

      return newSchedule
    })
  }

  const handleMouseDown = (day: string, hour: number) => {
    if (hour === -1) return
    setIsDragging(true)
    setDragStart({ day, hour })
    setDragEnd({ day, hour })
    setIsSelecting(!schedule[day].includes(hour))
  }

  const handleMouseMove = (day: string, hour: number) => {
    if (isDragging && hour !== -1) {
      setDragEnd({ day, hour })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      const startDayIndex = days.indexOf(dragStart.day)
      const endDayIndex = days.indexOf(dragEnd.day)
      const startHour = Math.min(dragStart.hour, dragEnd.hour)
      const endHour = Math.max(dragStart.hour, dragEnd.hour)

      for (
        let dayIndex = Math.min(startDayIndex, endDayIndex);
        dayIndex <= Math.max(startDayIndex, endDayIndex);
        dayIndex++
      ) {
        const day = days[dayIndex]
        for (let hour = startHour; hour <= endHour; hour++) {
          if (hour !== -1) {
            toggleSchedule(day, hour, isSelecting)
          }
        }
      }

      setIsDragging(false)
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const isInDragSelection = useCallback(
    (day: string, hour: number) => {
      if (!isDragging || hour === -1) return false
      const startDayIndex = days.indexOf(dragStart.day)
      const endDayIndex = days.indexOf(dragEnd.day)
      const dayIndex = days.indexOf(day)
      const startHour = Math.min(dragStart.hour, dragEnd.hour)
      const endHour = Math.max(dragStart.hour, dragEnd.hour)
      return (
        dayIndex >= Math.min(startDayIndex, endDayIndex) &&
        dayIndex <= Math.max(startDayIndex, endDayIndex) &&
        hour >= startHour &&
        hour <= endHour
      )
    },
    [isDragging, dragStart, dragEnd, days],
  )

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          ref={tableRef}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
          <thead>
            <tr>
              <th className="border border-border p-2"></th>
              {hours.map((hour) => (
                <th key={hour} className="border border-border p-2">
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border border-border p-2">{day}</td>
                {hours.map((_, index) => (
                  <td
                    key={index}
                    className={`border border-border p-2 cursor-pointer ${
                      schedule[day]?.includes(index)
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    } ${
                      isInDragSelection(day, index)
                        ? isSelecting
                          ? 'bg-primary/50'
                          : 'bg-muted'
                        : ''
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleMouseDown(day, index)
                    }}
                    onMouseMove={(e) => {
                      e.preventDefault()
                      handleMouseMove(day, index)
                    }}
                    onMouseUp={(e) => {
                      e.preventDefault()
                      handleMouseUp()
                    }}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
