'use client';

import WidgetWrapper from '@components/widgetElements/mini/WidgetWrapper';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import dayjs from 'dayjs';
import { useState } from 'react';

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

  // 좌우 버튼 핸들러
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
    <WidgetWrapper>
      <div className="flex items-center justify-between">
        <WidgetHeader title={'D-DAY'} />
      </div>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {D_DAY_ITEMS.map((item, index) => {
            const eventDate = dayjs(item.d_day);
            const dDayCount = eventDate.diff(today, 'day');
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center content-center gap-4 min-w-full mt-16"
              >
                <p className="text-black font-bold text-4xl">D-{dDayCount}</p>
                <p className="text-lg text-mainText font-semibold">
                  {item.title}
                </p>
                <p className="text-sm text-descText font-semibold">
                  {eventDate.format('YYYY-MM-DD')}
                </p>
              </div>
            );
          })}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-mainText text-2xl"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-mainText text-2xl"
        >
          &gt;
        </button>
      </div>
    </WidgetWrapper>
  );
}
