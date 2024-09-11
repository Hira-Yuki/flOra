'use client';

import { useEffect, useState } from 'react';

import LoadingWidget from '../LoadingWidget';
import ServerCalendar from './ServerCalendar';

export default function CalendarWidget() {
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);

  const isReady = timeZone && currentDate && today;

  useEffect(() => {
    const now = new Date();
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(clientTimeZone);
    setCurrentDate(now);
    setToday(now);
  }, []);

  return (
    <>
      {isReady ? (
        <ServerCalendar
          timeZone={timeZone}
          currentDate={currentDate}
          today={today}
        />
      ) : (
        <LoadingWidget size={'w-[422px] h-[280px]'} />
      )}
    </>
  );
}
