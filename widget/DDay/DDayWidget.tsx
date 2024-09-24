'use client';

import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import dayjs from 'dayjs';
import { useState } from 'react';

import DDayItem from './DDayItem';

const D_DAY_ITEMS = [
  { d_day: '2024-10-04', title: '프로젝트 마감' },
  { d_day: '2024-10-05', title: '온가족 대잔치' },
  { d_day: '2024-09-17', title: '추석' },
  { d_day: '2024-11-17', title: '아무날도 아닌데요' },
  { d_day: '2024-11-17', title: '테스트하려고 추가했어요.' },
  { d_day: '2100-12-17', title: '이때쯤이면 화성 갔겠죠?' },
];

export default function DDayWidget() {
  const today = dayjs();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? D_DAY_ITEMS.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === D_DAY_ITEMS.length - 1 ? 0 : prevIndex + 1,
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
            <DDayItem items={D_DAY_ITEMS} today={today} />
          </div>
        </div>
        <button onClick={handleNext} className={`text-white text-2xl`}>
          &gt;
        </button>
      </div>
    </WidgetWrapper>
  );
}
