import CustomBorderItem from '@components/CustomElements/CustomBorderItem';
import { ImageIcon, PenIcon } from '@components/icons';
import DiaryCreateModal from '@components/ModalContents/DiaryCreateModal';
import { useToggle } from '@hooks';
import { eventAPI } from '@lib/api/event';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface diaryListType {
  diaryId: string;
  title: string;
  date: string;
}
export default function Diary() {
  const [diaryList, setDiaryList] = useState<diaryListType[]>([]);
  const [diary, setDiary] = useState(null);
  const modalController = useToggle();
  const [diaryIdState, setDiaryIdState] = useState(null);

  const editDiary = () => {
    modalController.setTrue();
  };

  useEffect(() => {
    const getDiaryList = async () => {
      try {
        const { data } = await eventAPI.getDiaryList();
        setDiaryList(data);
        const todayDate = dayjs().format('YYYY-MM-DD'); // 오늘 날짜
        const todayDiary = data.find((diary) => diary.date === todayDate); // 오늘 날짜와 일치하는 일기 찾기
        const diaryId = todayDiary.diaryId;
        toDayDiary(diaryId);
        setDiaryIdState(diaryId);
      } catch (err) {
        console.error('Failed to get diary list', err);
      }
    };
    const toDayDiary = async (diaryId) => {
      try {
        const { data } = await eventAPI.getTodayDiary(diaryId);
        setDiary(data);
      } catch (err) {
        console.error('Failed to get today diary', err);
      }
    };
    getDiaryList();
  }, [modalController.value]);

  return (
    <div className="bg-floraBeige rounded-2xl h-full text-mainText overflow-hidden grid grid-cols-3">
      {/* 이미지 */}
      <div className="col-span-1">
        {diary ? (
          <img
            src={diary.imageUrl}
            alt="diary image"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center cursor-pointer">
            <ImageIcon />
          </div>
        )}
      </div>

      {/* 일기 작성 */}
      <div className="col-span-1">
        {diary ? (
          <div className="flex flex-col">
            <div className="flex justify-between p-4 pl-6 text-lg text-mainText font-bold">
              <h3>{diary.title}</h3>
              <div onClick={editDiary} className="cursor-pointer">
                <PenIcon />
              </div>
            </div>
            <div className="text-right text-descText font-medium pr-6">
              {diary.date}
            </div>
            <div className="p-6 text-mainText font-medium">{diary.content}</div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="font-bold text-mainText">
              <p className="cursor-pointer">
                오늘의 일기를 <br />
                작성해 보세요.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* 히스토리 */}
      <div className="col-span-1 border-l-2 border-white">
        <div className="p-4">
          <h3 className="text-center text-lg font-bold text-descText">
            History
          </h3>
        </div>
        <div>
          <ul className="flex flex-col gap-4 overflow-scroll max-h-56 p-3 font-semibold">
            {diaryList.map((item) => (
              <CustomBorderItem
                key={item.diaryId}
                indexColor={'indexRed'} // 나증에 색 순환되게???
                text={item.title}
                subText={item.date}
              />
            ))}
          </ul>
        </div>
      </div>
      {diary && (
        <DiaryCreateModal
          modalController={modalController}
          initialValue={{
            title: diary.title,
            date: diary.date,
            content: diary.content,
          }}
          photo={diary.imageUrl}
          diaryId={diaryIdState}
        />
      )}
    </div>
  );
}
