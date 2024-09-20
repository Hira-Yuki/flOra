export default function Diary() {
  return (
    <div className="bg-floraBeige rounded-2xl h-full text-mainText shadow-gray-200 shadow-lg overflow-hidden grid grid-cols-3">
      {/* 이미지 */}
      <div className="bg-emerald-400 col-span-1">1</div>

      {/* 일기 작성 */}
      <div className="bg-fuchsia-400 col-span-1">
        <div className="flex flex-col">
          <div>
            <h3>타이틀</h3>
            <div>ic</div>
          </div>
          <div className="text-right">2024-09-20</div>
          <div>어쩌구 저쩌구 블라블라</div>
        </div>
      </div>

      {/* 히스토리 */}
      <div className="col-span-1">
        <div className="p-4">
          <h3 className="text-center text-lg font-bold text-descText">
            History
          </h3>
        </div>
        <div>
          <ul className="flex flex-col gap-4 overflow-scroll max-h-56 p-3 font-semibold">
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexYellow rounded-full" />
              <p className="text-ellipsis line-clamp-2">
                Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor
                sit Lorem ipsum dolor Lorem ipsum dolor sit sitLorem ipsum dolor
              </p>
              <p className="text-sm font-medium mt-1 text-descText">
                10:00-11:00
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
