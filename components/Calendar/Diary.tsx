import CustomBorderItem from '@components/CustomElements/CustomBorderItem';
import ImageIcon from '@components/icons/ImageIcon';
import PenIcon from '@components/icons/PenIcon';

export default function Diary() {
  // 임시 데이터
  const Diary = false;

  return (
    <div className="bg-floraBeige rounded-2xl h-full text-mainText overflow-hidden grid grid-cols-3">
      {/* 이미지 */}
      <div className="col-span-1">
        {Diary ? (
          <img
            src="https://picsum.photos/300/300"
            alt="diary"
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
        {Diary ? (
          <div className="flex flex-col">
            <div className="flex justify-between p-4 pl-6 text-lg text-mainText font-bold">
              <h3>일기의 제목이 있는 풍경</h3>
              <PenIcon />
            </div>
            <div className="text-right text-descText font-medium pr-6">
              2024-09-20
            </div>
            <div className="p-6 text-mainText font-medium">
              어쩌구 저쩌구 블라블라
            </div>
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
            <CustomBorderItem
              indexColor={'indexRed'}
              text={'sample'}
              subText={'2024-07-30'}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
