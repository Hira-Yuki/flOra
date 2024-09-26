import '@styles/custom-react-time-picker.css';
import dayjs from 'dayjs';
import { TimePicker } from 'react-time-picker';
import { toast } from 'react-toastify';

export default function CustomTimePicker({
  value,
  handleDate,
  startDate, // 추가: start 시간을 전달받음
  endDate,
  type, // 'start' 또는 'end'로 구분
}: {
  value: Date;
  handleDate: (update: Date) => void;
  startDate?: Date;
  endDate?: Date;
  type: 'start' | 'end';
}) {
  const onChange = (time: string) => {
    // 'HH:mm' 형식의 time을 다시 Date 객체로 변환
    const [hours, minutes] = time.split(':').map(Number);
    const updatedDate = dayjs(value).hour(hours).minute(minutes).toDate();

    // 'end'가 'start'보다 빠르면 자동으로 1분을 더함
    if (type === 'end' && startDate && dayjs(updatedDate).isBefore(startDate)) {
      const correctedEndDate = dayjs(startDate).add(1, 'minute').toDate();
      toast.warn('종료시간이 시작시간보다 빠를 수 없어요.');
      handleDate(correctedEndDate); // 수정된 시간 전달
    }
    // 'start'가 'end'보다 늦어지면 자동으로 'start' 시간을 1분 뺌
    else if (
      type === 'start' &&
      endDate &&
      dayjs(updatedDate).isAfter(endDate)
    ) {
      const correctedStartDate = dayjs(endDate).subtract(1, 'minute').toDate();
      toast.warn('시작시간이 종료시간보다 늦을 수 없어요.');
      handleDate(correctedStartDate); // 수정된 시간 전달
    } else {
      handleDate(updatedDate); // 변경된 시간 전달
    }
  };

  return (
    <>
      <TimePicker
        onChange={onChange}
        value={dayjs(value).format('HH:mm')}
        clearIcon={null}
        clockIcon={null}
        disableClock={true}
        format={'aa hh:mm'}
      />
    </>
  );
}
