import CustomModal from '@components/CustomElements/CustomModal';
import CreateEventForm from '@components/forms/CreateEventForm';
import { useState } from 'react';

import EventToggleSwitch from './EventToggleSwitch';

// // 플러그인 적용
// dayjs.extend(utc);
// dayjs.extend(timezone);

// dayjs.tz.setDefault('Asia/Seoul'); // 기본 타임존을 서울로 설정

interface EventCreateModalProps {
  modalController: {
    value: boolean;
    toggleValue: () => void;
    setTrue: () => void;
    setFalse: () => void;
  };
}

export default function EventCreateModal({
  modalController,
}: EventCreateModalProps) {
  const [isEvent, setIsEvent] = useState('event');

  return (
    <CustomModal modalController={modalController}>
      {/* 이벤트/투두 변경 버튼 */}
      <EventToggleSwitch
        selectedOption={isEvent}
        onChange={(value) => setIsEvent(value)}
      />
      {/* 이벤트 생성 폼 */}
      <CreateEventForm />
    </CustomModal>
  );
}
