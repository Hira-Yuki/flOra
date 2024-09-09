'use client';

import { Suspense, useEffect, useState } from 'react';

import LoadingWidget from './LoadingWidget';
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

  const goToPreviousMonth = () => {
    if (currentDate) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
    }
  };

  const goToNextMonth = () => {
    if (currentDate) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
    }
  };

  return (
    <Suspense fallback={<LoadingWidget size={'w-96 h-52'} />}>
      {isReady && (
        <ServerCalendar
          timeZone={timeZone}
          currentDate={currentDate}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          today={today}
        />
      )}
    </Suspense>
  );
}
