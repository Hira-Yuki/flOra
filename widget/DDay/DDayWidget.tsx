'use client';

import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { eventAPI } from '@lib/api/event';
import { useEffect, useState } from 'react';

import DDayItem from './DDayItem';

export default function DDayWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dDays, setDDays] = useState([]);

  useEffect(() => {
    const getDDay = async () => {
      try {
        const { data } = await eventAPI.getDDay();
        setDDays(data);
      } catch (err) {
        console.log(err);
        // 에러가 발생하면 DDay 객체를 빈 배열로 초기화
        setDDays([]);
      }
    };
    getDDay();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dDays.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dDays.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <WidgetWrapper bgColor={'bg-floraGreen'}>
      <div className="flex items-center justify-between">
        <h3
          className={`font-semibold text-lg sm:text-xl ml-2 text-floraYellow h-10`}
        >
          D-DAY
        </h3>
      </div>
      <div className="flex">
        <button onClick={handlePrev} className={`text-white text-2xl`}>
          &lt;
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <DDayItem items={dDays} />
          </div>
        </div>
        <button onClick={handleNext} className={`text-white text-2xl`}>
          &gt;
        </button>
      </div>
    </WidgetWrapper>
  );
}
