'use client';

import { Suspense, useEffect, useState } from 'react';

import LoadingWidget from './LoadingWidget';
import ServerCalendar from './ServerCalendar';

export default function ClientCalendar() {
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const today = new Date();

  useEffect(() => {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(clientTimeZone);
    setCurrentDate(new Date());
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
      {timeZone && currentDate && (
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
